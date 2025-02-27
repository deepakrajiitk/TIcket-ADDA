// Import the required dependencies for the Hyperledger Fabric SDK
"use strict";
const { Gateway, Wallets } = require("fabric-network");
const FabricCAServices = require("fabric-ca-client");
const fs = require("fs");
const path = require("path");

// load the network configuration
const connectionProfilePath = path.resolve(
    __dirname,
    "..",
    "..",
    "test-network",
    "organizations",
    "peerOrganizations",
    "org2.example.com",
    "connection-org2.json"
);

const ccp = JSON.parse(fs.readFileSync(connectionProfilePath, "utf8"));
const walletPath = path.resolve(__dirname, "wallet");

async function enrollAdmin2() {
    try {
        // load the network configuration

        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities["ca.org2.example.com"];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(
            caInfo.url,
            { trustedRoots: caTLSCACerts, verify: false },
            caInfo.caName
        );

        // Create a new file system based wallet for managing identities.
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const identity = await wallet.get("admin2");
        if (identity) {
            console.log(
                'An identity for the admin user "admin2" already exists in the wallet'
            );
            return;
        }

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({
            enrollmentID: "admin",
            enrollmentSecret: "adminpw",
        });

        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: "Org2MSP",
            type: "X.509",
        };
        await wallet.put("admin2", x509Identity);
        console.log(
            'Successfully enrolled admin user "admin2" and imported it into the wallet'
        );
    } catch (error) {
        console.error(`Failed to enroll admin2 user "admin2": ${error}`);
        process.exit(1);
    }
}
/////////////////////////////////////////////////////

async function registerTransporter(
    firstName,
    lastName,
    email,
    address,
    contactNumber
) {
    try {
        // Load the network configuration

        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities["ca.org2.example.com"].url;
        const ca = new FabricCAServices(caURL);

        // Create a new file system based wallet for managing identities.
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        // console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userIdentity = await wallet.get(email);
        if (userIdentity) {
            const resp = `An identity for the user "${email}" already exists in the wallet`;
            console.log(resp);
            return resp;
        }

        // Check to see if we've already enrolled the admin user.
        const adminIdentity = await wallet.get("admin2");
        if (!adminIdentity) {
            const resp =
                'An identity for the admin user "admin2" does not exist in the wallet';
            console.log(resp);
            // console.log("Run the enrollAdmin2.js application before retrying");
            return resp;
        }

        // Build a user object for authenticating with the CA
        const provider = wallet
            .getProviderRegistry()
            .getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, "admin");

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register(
            {
                affiliation: "org2.department1",
                enrollmentID: email,
                role: "client",
                attrs: [
                    { name: "firstName", value: firstName, ecert: true },
                    { name: "lastName", value: lastName, ecert: true },
                ],
                maxEnrollments: 1,
            },
            adminUser
        );
        const enrollment = await ca.enroll({
            enrollmentID: email,
            enrollmentSecret: secret,
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: "Org2MSP",
            type: "X.509",
        };
        await wallet.put(email, x509Identity);

        console.log(
            `Successfully registered and enrolled user "${email}" and imported it into the wallet`
        );

        const resp = await createTransportProvider(
            email,
            firstName,
            address,
            contactNumber
        );

        return resp.toString();
    } catch (error) {
        console.error(`Failed to register user "${email}": ${error}`);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function createModeOfTransport(
    transportID,
    name,
    capacity,
    speed,
    source,
    destination
) {
    // Create a new gateway instance
    const gateway = new Gateway();

    try {
        // Connect to the gateway using a connection profile and wallet
        // Replace with the actual path to your connection profile
        // Replace with the actual path to your wallet

        const wallet = await Wallets.newFileSystemWallet(walletPath);

        await gateway.connect(ccp, {
            wallet,
            identity: "admin2", // Replace with the actual identity name in your wallet
            discovery: { enabled: true, asLocalhost: true }, // Replace with the appropriate discovery settings
        });

        // Get the network and contract from the gateway
        const network = await gateway.getNetwork("mychannel"); // Replace with the actual channel name
        const contract = network.getContract("ticketadda"); // Replace with the actual chaincode name

        // Invoke the createModeOfTransport function on the chaincode
        const result = await contract.submitTransaction(
            "createModeOfTransport",
            transportID,
            name,
            capacity,
            speed,
            source,
            destination
        );

        const resp = `Transaction result: ${result.toString()}`;
        console.log(resp);

        return resp;
    } catch (error) {
        console.error(`Failed to invoke chaincode: ${error}`);
        return error;
    } finally {
        // Disconnect from the gateway
        gateway.disconnect();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

async function deleteModeOfTransport(transporterID, busID) {
    // Create a new gateway instance
    const gateway = new Gateway();

    try {
        // Connect to the gateway using a connection profile and wallet

        const wallet = await Wallets.newFileSystemWallet(walletPath);

        await gateway.connect(ccp, {
            wallet,
            identity: "admin2", // Replace with the actual identity name in your wallet
            discovery: { enabled: true, asLocalhost: true }, // Replace with the appropriate discovery settings
        });

        // Get the network and contract from the gateway
        const network = await gateway.getNetwork("mychannel"); // Replace with the actual channel name
        const contract = network.getContract("ticketadda"); // Replace with the actual chaincode name

        // Invoke the deleteModeOfTransport function on the chaincode
        const transportIDValue = transporterID + busID;
        const result = await contract.submitTransaction(
            "deleteModeOfTransport",
            transportIDValue
        );
        console.log(`Transaction result: ${result.toString()}`);

        return result;
    } catch (error) {
        console.error(`Failed to invoke chaincode: ${error}`);
    } finally {
        // Disconnect from the gateway
        gateway.disconnect();
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

async function getTransportation(_transportID, busID) {
    // Create a new gateway instance
    const gateway = new Gateway();

    const transportID = _transportID + busID;

    try {
        // Connect to the gateway using a connection profile and wallet

        const wallet = await Wallets.newFileSystemWallet(walletPath);

        await gateway.connect(ccp, {
            wallet,
            identity: "admin2", // Replace with the actual identity name in your wallet
            discovery: { enabled: true, asLocalhost: true }, // Replace with the appropriate discovery settings
        });

        // Get the network and contract from the gateway
        const network = await gateway.getNetwork("mychannel"); // Replace with the actual channel name
        const contract = network.getContract("ticketadda"); // Replace with the actual chaincode name

        // Invoke the getTransportation function on the chaincode
        const result = await contract.evaluateTransaction(
            "getTransportation",
            transportID
        );
        console.log(`Transportation: ${result.toString()}`);

        return result;
    } catch (error) {
        console.error(`Failed to invoke chaincode: ${error}`);
    } finally {
        // Disconnect from the gateway
        gateway.disconnect();
    }
}

////////////////////////////////////////////////////

async function updateTransportationDetails(
    transportID,
    name,
    capacity,
    speed,
    source,
    destination
) {
    // Create a new gateway instance
    const gateway = new Gateway();

    try {
        // Connect to the gateway using a connection profile and wallet
        // Replace with the actual path to your connection profile
        // Replace with the actual path to your wallet

        const wallet = await Wallets.newFileSystemWallet(walletPath);

        await gateway.connect(ccp, {
            wallet,
            identity: "admin2", // Replace with the actual identity name in your wallet
            discovery: { enabled: true, asLocalhost: true }, // Replace with the appropriate discovery settings
        });

        // Get the network and contract from the gateway
        const network = await gateway.getNetwork("mychannel"); // Replace with the actual channel name
        const contract = network.getContract("ticketadda"); // Replace with the actual chaincode name

        const result = await contract.submitTransaction(
            "updateTransportationDetails",
            transportID,
            name,
            capacity,
            speed,
            source,
            destination
        );
        console.log(`Transportation updated: ${result.toString()}`);

        return result;
    } catch (error) {
        console.error(`Failed to invoke chaincode: ${error}`);
    } finally {
        // Disconnect from the gateway
        gateway.disconnect();
    }
}

///////////////////////////////////////////////////////////

// Function to invoke the chaincode
async function createTransportProvider(providerID, name, address, contact) {
    // Create a new gateway instance
    const gateway = new Gateway();

    try {
        // Connect to the gateway using a connection profile and wallet
        // Replace with the actual path to your connection profile
        // Replace with the actual path to your wallet

        const wallet = await Wallets.newFileSystemWallet(walletPath);
        await gateway.connect(ccp, {
            wallet,
            identity: "admin2", // Replace with the actual identity name in your wallet
            discovery: { enabled: true, asLocalhost: true }, // Replace with the appropriate discovery settings
        });
        // Get the network and contract from the gateway
        const network = await gateway.getNetwork("mychannel"); // Replace with the actual channel name
        const contract = network.getContract("ticketadda"); // Replace with the actual chaincode name

        const result = await contract.submitTransaction(
            "createTransportProvider",
            providerID,
            name,
            address,
            contact
        );
        const resp = `Transportation provider created: ${result.toString()}`;
        console.log(resp);

        return resp;
    } catch (error) {
        console.error(`Failed to invoke chaincode: ${error}`);
    } finally {
        // Disconnect from the gateway
        gateway.disconnect();
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to invoke the chaincode
async function deleteTransportProvider(providerIDValue) {
    // Create a new gateway instance
    const gateway = new Gateway();

    try {
        // Connect to the gateway using a connection profile and wallet
        // Replace with the actual path to your connection profile
        // Replace with the actual path to your wallet

        const wallet = await Wallets.newFileSystemWallet(walletPath);

        await gateway.connect(ccp, {
            wallet,
            identity: "admin2", // Replace with the actual identity name in your wallet
            discovery: { enabled: true, asLocalhost: true }, // Replace with the appropriate discovery settings
        });

        // Get the network and contract from the gateway
        const network = await gateway.getNetwork("mychannel"); // Replace with the actual channel name
        const contract = network.getContract("ticketadda"); // Replace with the actual chaincode name

        // Invoke the deleteTransportProvider function on the chaincode
        const result = await contract.submitTransaction(
            "deleteTransportProvider",
            providerIDValue
        );
        // console.log(result);
        return result;
    } catch (error) {
        console.error(`Failed to invoke chaincode: ${error}`);
        return error;
    } finally {
        // Disconnect from the gateway
        gateway.disconnect();
    }
}

async function findAvailableTransport(source, destination) {
    const gateway = new Gateway();

    try {
        // Connect to the gateway using a connection profile and wallet
        // Replace with the actual path to your connection profile
        // Replace with the actual path to your wallet

        const wallet = await Wallets.newFileSystemWallet(walletPath);

        await gateway.connect(ccp, {
            wallet,
            identity: "admin2", // Replace with the actual identity name in your wallet
            discovery: { enabled: true, asLocalhost: true }, // Replace with the appropriate discovery settings
        });

        // Get the network and contract from the gateway
        const network = await gateway.getNetwork("mychannel"); // Replace with the actual channel name
        const contract = network.getContract("ticketadda"); // Replace with the actual chaincode name

        // Invoke the chaincode function to find available transport

        const result = await contract.submitTransaction(
            "findAvailableTransport",
            source,
            destination
        );

        if (result.toString() === "{}") {
            return result.toString();
        }

        // Parse the result as JSON
        const availableTransport = JSON.parse(result.toString());
        // Disconnect from the gateway
        gateway.disconnect();
        return availableTransport;
    } catch (error) {
        console.error("Failed to invoke chaincode:", error);
    }
}

//////////////////////////////////////////////////////////////////////////////////////

enrollAdmin2();
// console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
// registerTransporter("Adi", "Loth", "testid1", "Jodhpur", "1990");
// enrollAdmin2();
// registerTransporter("Adi", "Loth", "id867kj4", "Jodhpur", "1990");

// createModeOfTransport("testid1", "Bu45", 50, "120", "Delhi", "Bombay");
// createModeOfTransport("testid1", "Bus29", 150, "20", "Kanpur", "Bombay");
// createModeOfTransport("testid1", "Bus35", 250, "10", "Kanpur", "Bombay");

// deleteModeOfTransport('idxx', 'B1');
// getTransportation("testid1", "Bu45");

// updateTransportationDetails('testid1', 'aa', '30', '40' , 'Kanpur', 'Delhi')

// deleteTransportProvider("id2");
// findAvailableTransport("Kanpurd", "Bombay");

// findAvailableTransport("Kanpur", "Bombay");

module.exports = {
    registerTransporter,
    createModeOfTransport,
    deleteModeOfTransport,
    getTransportation,
    updateTransportationDetails,
    createTransportProvider,
    findAvailableTransport,
    deleteTransportProvider,
};
