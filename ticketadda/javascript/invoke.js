"use strict";

const { Gateway, Wallets } = require("fabric-network");
const fs = require("fs");
const path = require("path");

const channelName = "mychannel";
const chaincodeName = "ticketadda";

// load the network configuration
const ccpPath = path.resolve(
    __dirname,
    "..",
    "..",
    "test-network",
    "organizations",
    "peerOrganizations",
    "org1.example.com",
    "connection-org1.json"
);

const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
const walletPath = path.join(__dirname, "wallet");
const gateway = new Gateway();


async function calculateTicketPrice(providerId, transportId) {
    try {

        // create a new file system wallet
        
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // create a new gateway for connecting to our peer node
        
        await gateway.connect(ccp, {
            wallet,
            identity: providerId,
            discovery: { enabled: true, asLocalhost: true },
        });

        // get the network and contract objects
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);

        // call the calculateTicketPrice function
        const result = await contract.evaluateTransaction(
            "calculateTicketPrice",
            providerId + transportId
        );
        console.log(`Ticket price: ${result.toString()}`);

        // disconnect the gateway
        await gateway.disconnect();
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        // process.exit(1);
    }
}

async function bookTicket(userId, providerID, transportId, noSeats) {
    try {

        // Create a new file system wallet for managing identities
        
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        const list = await wallet.list();

        // Check to see if we've already enrolled the user
        const identity = await wallet.get(userId);
        if (!identity) {
            console.log(
                `An identity for the user ${userId} does not exist in the wallet`
            );
            console.log("Run the registerUser.js application before retrying");
            return;
        }

        // Create a new gateway for connecting to our peer node
        
        await gateway.connect(ccp, {
            wallet,
            identity: userId,
            discovery: { enabled: true, asLocalhost: true },
        });

        // Get the network (channel) our contract is deployed to
        const network = await gateway.getNetwork(channelName);

        // Get the contract from the network
        const contract = await network.getContract(chaincodeName);

        // Submit the transaction to the smart contract
        const result = await contract.submitTransaction(
            "bookTicket",
            userId,
            providerID + transportId,
            noSeats
        );

        const resultTicket = await JSON.parse(result.toString());

        console.log(
            `Transaction has been submitted with ticket ID: ${resultTicket.ID}`
        );
        gateway.disconnect();
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        // process.exit(1);
    }
}

async function validateTicket(ticketId) {

    // Create a new file system wallet for managing identities
    
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    // Create a new gateway for connecting to our peer node
    
    await gateway.connect(ccp, {
        wallet,
        identity: "admin2", // Replace with the actual identity name in your wallet
        discovery: { enabled: true, asLocalhost: true }, // Replace with the appropriate discovery settings
    });

    // Get the network (channel) our contract is deployed to
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network
    const contract = network.getContract(chaincodeName);

    const result = await contract.submitTransaction("validateTicket", ticketId);
    const num = result.readUIntBE(0, result.length);

    if (num != 48) {
        console.log("Valid Ticket");
        gateway.disconnect();
        return true;
    } else {
        console.log("Invalid Ticket");
        gateway.disconnect();
        return false;
    }
}

async function cancelBooking(userId, ticketId) {
    try {

        // Create a new file system wallet for managing identities
        
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // Check to see if we've already enrolled the user
        const identity = await wallet.get(userId);
        if (!identity) {
            console.log(
                `An identity for the user ${userId} does not exist in the wallet`
            );
            console.log("Run the registerUser.js application before retrying");
            return;
        }

        // Create a new gateway for connecting to our peer node
        
        await gateway.connect(ccp, {
            wallet,
            identity: userId,
            discovery: { enabled: true, asLocalhost: true },
        });

        // get the network and contract objects
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);

        // call the calculateTicketPrice function
        await contract.evaluateTransaction("cancelBooking", userId, ticketId);
        console.log(`Successfully cancelled booking ${ticketId}`);

        // disconnect the gateway
        gateway.disconnect();
    } catch (error) {
        console.error(`Failed to cancel booking: ${error}`);
        // process.exit(1);
    }
}

async function findAvailableSeats(providerId, transportId) {
    try {


        // create a new file system wallet
        
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // create a new gateway for connecting to our peer node
        
        await gateway.connect(ccp, {
            wallet,
            identity: providerId,
            discovery: { enabled: true, asLocalhost: true },
        });

        // get the network and contract objects
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);

        // call the calculateTicketPrice function
        const result = await contract.evaluateTransaction(
            "findAvailableSeats",
            providerId + transportId
        );
        console.log(`Available seats: ${result.toString()}`);

        // disconnect the gateway
        await gateway.disconnect();
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        // process.exit(1);
    }
}

async function getAllBookingsForPassenger(userId) {
    try {


        // create a new file system wallet
        
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // create a new gateway for connecting to our peer node
        
        await gateway.connect(ccp, {
            wallet,
            identity: userId,
            discovery: { enabled: true, asLocalhost: true },
        });

        // get the network and contract objects
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);

        // call the calculateTicketPrice function
        const result = await contract.evaluateTransaction(
            "getAllBookingsForPassenger",
            userId
        );
        console.log(`Bookings: ${result.toString()}`);

        // disconnect the gateway
        gateway.disconnect();
        return result;
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        // process.exit(1);
    }
}

// -------------------------------------------------------------------------------------

// bookTicket('ash@gmail', 'testid1', 'Bu45', 10);
// calculateTicketPrice('testid1', 'Bu45');
// validateTicket('254d0e2971819adf5c94d38031c096d4127e2ed784703f308d24a67f51a0f53e')
// cancelBooking(
//     "ash@gmail",
//     "254d0e2971819adf5c94d38031c096d4127e2ed784703f308d24a67f51a0f53e"
// );
// findAvailableSeats('testid1', 'Bu45')
// getAllBookingsForPassenger('ash@gmail')

module.exports = {
    calculateTicketPrice,
    bookTicket,
    validateTicket,
    cancelBooking,
    findAvailableSeats,
    getAllBookingsForPassenger,
};
