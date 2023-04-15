'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const channelName = 'mychannel';
const chaincodeName = 'ticketadda';

async function calculateTicketPrice(providerId, transportId) {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // create a new file system wallet
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // create a new gateway for connecting to our peer node
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: providerId,
            discovery: { enabled: true, asLocalhost: true },
        });

        // get the network and contract objects
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);

        // call the calculateTicketPrice function
        const result = await contract.evaluateTransaction('calculateTicketPrice', providerId+transportId);
        console.log(`Ticket price: ${result.toString()}`);

        // disconnect the gateway
        await gateway.disconnect();
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

async function bookTicket(userId, providerID, transportId, noSeats) {
  try {
    console.log("lakdsf;;;;;;;;;adsffffffffffffdassda")
    // Load connection profile; will be used to locate a gateway
    const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    // Create a new file system wallet for managing identities
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    const list = await wallet.list();

    // Check to see if we've already enrolled the user
    const identity = await wallet.get(userId);
    if (!identity) {
      console.log(`An identity for the user ${userId} does not exist in the wallet`);
      console.log('Run the registerUser.js application before retrying');
      return;
    }

    // Create a new gateway for connecting to our peer node
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: userId, discovery: { enabled: true, asLocalhost: true } });

    // Get the network (channel) our contract is deployed to
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network
    const contract = network.getContract(chaincodeName);

    // Submit the transaction to the smart contract
    const result = await contract.submitTransaction('bookTicket', userId, providerID+transportId, noSeats);

    const resultTicket = JSON.parse(result.toString());

    console.log(`Transaction has been submitted with ticket ID: ${resultTicket.ID}`);
    gateway.disconnect();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}

async function validateTicket(ticketId){
    // Load connection profile; will be used to locate a gateway
    const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    // Create a new file system wallet for managing identities
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    
    // Create a new gateway for connecting to our peer node
    const gateway = new Gateway();
    await gateway.connect(ccp, {
        wallet,
        identity: 'admin2', // Replace with the actual identity name in your wallet
        discovery: { enabled: true, asLocalhost: true } // Replace with the appropriate discovery settings
    });

    // Get the network (channel) our contract is deployed to
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network
    const contract = network.getContract(chaincodeName);

    const result = await contract.submitTransaction('validateTicket', ticketId);
    const num = result.readUIntBE(0, result.length);

    if (num != 48){
        console.log('Valid Ticket');
    }else{
        console.log('Invalid Ticket')
    }

    gateway.disconnect();
}

async function cancelBooking(userId, ticketId) {
    try {
        // Load connection profile; will be used to locate a gateway
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system wallet for managing identities
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // Check to see if we've already enrolled the user
        const identity = await wallet.get(userId);
        if (!identity) {
            console.log(`An identity for the user ${userId} does not exist in the wallet`);
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: userId,
            discovery: { enabled: true, asLocalhost: true },
        });

        // get the network and contract objects
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);

        // call the calculateTicketPrice function
        await contract.evaluateTransaction('cancelBooking', userId, ticketId);
        console.log(`Successfully cancelled booking ${ticketId}`);

        // disconnect the gateway
        gateway.disconnect();
    } catch (error) {
        console.error(`Failed to cancel booking: ${error}`);
        process.exit(1);
    }
}

async function findAvailableSeats(providerId, transportId) {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // create a new file system wallet
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // create a new gateway for connecting to our peer node
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: providerId,
            discovery: { enabled: true, asLocalhost: true },
        });

        // get the network and contract objects
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);

        // call the calculateTicketPrice function
        const result = await contract.evaluateTransaction('findAvailableSeats', providerId+transportId);
        console.log(`Available seats: ${result.toString()}`);

        // disconnect the gateway
        await gateway.disconnect();
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

// -------------------------------------------------------------------------------------

// bookTicket('deepak@gmail', 'testid1', 'Bus5', 10);
// calculateTicketPrice('testid1', 'Bus5');
// validateTicket('4d5bb6df0c0c654a0f0ca8896cb190097acc816dfe746731670aacfaa55d6df4')
// cancelBooking('deepak@gmail', 'ee66c305fc5d15bea6f91e5b926fb3f9865e6cd7910951a247b38c324b195691')
// findAvailableSeats('testid1', 'Bus5')