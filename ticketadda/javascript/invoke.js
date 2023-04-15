'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const userId = 'appUser';
const channelName = 'mychannel';
const chaincodeName = 'ticketadda';

async function calculateTicketPrice(transportId) {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', 'connection.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // create a new file system wallet
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // create a new gateway for connecting to our peer node
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
        const result = await contract.evaluateTransaction('calculateTicketPrice', transportId);
        console.log(`Ticket price: ${result.toString()}`);

        // disconnect the gateway
        await gateway.disconnect();
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

calculateTicketPrice();
