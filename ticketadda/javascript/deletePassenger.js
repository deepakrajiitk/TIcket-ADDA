// const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

async function main(passengerId) {
    try {
        // Load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system wallet
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user
        const userIdentity = await wallet.get('appUser');
        if (!userIdentity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            return;
        }

        // Create a new gateway
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: 'appUser',
            discovery: { enabled: true, asLocalhost: true },
        });

        // Get the network and contract
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('ticketadda');

        // Call the deletePassenger method
        // const passengerId = 'passenger1';
        await contract.submitTransaction('deletePassenger', passengerId);

        console.log(`Successfully deleted passenger ${passengerId}`);

        // Disconnect from the gateway
        gateway.disconnect();
    } catch (error) {
        console.error(`Failed to delete passenger: ${error}`);
        process.exit(1);
    }
}

main("deepakraj@example.com");
