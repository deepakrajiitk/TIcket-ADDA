'use strict';

const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');

async function registerTransporter(firstName, lastName, email, password) {
    try {
      // Load the network configuration
      const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org2.example.com', 'connection-org2.json');
      const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
  
      // Create a new CA client for interacting with the CA.
      const caURL = ccp.certificateAuthorities['ca.org2.example.com'].url;
      const ca = new FabricCAServices(caURL);
  
      // Create a new file system based wallet for managing identities.
      const walletPath = path.join(process.cwd(), 'wallet');
      const wallet = await Wallets.newFileSystemWallet(walletPath);
      console.log(`Wallet path: ${walletPath}`);
  
      // Check to see if we've already enrolled the user.
      const userIdentity = await wallet.get(email);
      if (userIdentity) {
        console.log(`An identity for the user "${email}" already exists in the wallet`);
        return;
      }
  
      // Check to see if we've already enrolled the admin user.
      const adminIdentity = await wallet.get('admin2');
      if (!adminIdentity) {
        console.log('An identity for the admin user "admin" does not exist in the wallet');
        console.log('Run the enrollAdmin.js application before retrying');
        return;
      }
  
      // Build a user object for authenticating with the CA
      const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
      const adminUser = await provider.getUserContext(adminIdentity, 'admin');
  


      // Register the user, enroll the user, and import the new identity into the wallet.
      const secret = await ca.register({
        affiliation: 'org2.department1',
        enrollmentID: email,
        role: 'client',
        attrs: [
          { name: 'firstName', value: firstName, ecert: true },
          { name: 'lastName', value: lastName, ecert: true }
        ],
        maxEnrollments: 1
      }, adminUser);
      const enrollment = await ca.enroll({
        enrollmentID: email,
        enrollmentSecret: secret
      });
      const x509Identity = {
        credentials: {
          certificate: enrollment.certificate,
          privateKey: enrollment.key.toBytes(),
        },
        mspId: 'Org2MSP',
        type: 'X.509',
      };
      await wallet.put(email, x509Identity);
      console.log(`Successfully registered and enrolled user "${email}" and imported it into the wallet`);
  
    } catch (error) {
      console.error(`Failed to register user "${email}": ${error}`);
      process.exit(1);
    }
  }
  
  registerTransporter('MR', 'Travels', 'mrtravels@example.com', 'password');
  