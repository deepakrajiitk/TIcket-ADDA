'use strict';


const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const { Context } = require('mocha');
const path = require('path');

async function createPassenger(passengerId, name, age, gender, user = "deepakraj@example.com") {
  try {
    console.log("lakdsf;;;;;;;;;adsffffffffffffdassda")
    // Load connection profile; will be used to locate a gateway
    const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    // Create a new file system based wallet for managing identities
    const walletPath = path.join(__dirname, 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    const list = await wallet.list();

    // Check to see if we've already enrolled the user
    const identity = await wallet.get(user);
    if (!identity) {
      console.log(`An identity for the user ${user} does not exist in the wallet`);
      console.log('Run the registerUser.js application before retrying');
      return;
    }

    // Create a new gateway for connecting to our peer node
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: user,
      discovery: { enabled: true, asLocalhost: true }
    });

    // Get the network (channel) our contract is deployed to
    const network = await gateway.getNetwork('mychannel');

    // Get the contract from the network
    const contract = network.getContract('ticketadda');

    // Submit the transaction to the network
    await contract.submitTransaction('createPassenger', passengerId, name, age, 'male', true);
    // ===============================Delete later======================================
    // await contract.submitTransaction('createTransportation', 'Bus1', 'Aditya', 'Bus', 'delhi to goa', 100)
    console.log(`Passenger ${passengerId} has been created`);
    console.log(`Transporatation has been created`);

    // Disconnect from the gateway
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to create passenger: ${error}`);
    process.exit(1);
  }
}

module.exports = {
  createPassenger
};