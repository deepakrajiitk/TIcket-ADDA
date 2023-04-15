"use strict";

const FabricCAServices = require("fabric-ca-client");
const { Gateway, Wallets } = require("fabric-network");
const fs = require("fs");
const { Context } = require("mocha");
const path = require("path");

const channelName = "mychannel";
const chaincodeName = "ticketadda";
const userId = "appUser";

// const args = process.argv;

// // Extract the arguments
// const arg1 = args[2]; // First argument
// const arg2 = args[3];
// const arg3 = args[4];
// const arg4 = args[5];

async function createPassenger(passengerId, name, age, gender) {
    try {
        // Load connection profile; will be used to locate a gateway
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

        // Create a new file system based wallet for managing identities
        const walletPath = path.join(__dirname, "wallet");
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // Check to see if we've already enrolled the user
        const identity = await wallet.get(passengerId);
        if (!identity) {
            console.log(
                `An identity for the user ${passengerId} does not exist in the wallet`
            );
            console.log("Run the registerUser.js application before retrying");
            return;
        }

        // Create a new gateway for connecting to our peer node
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: passengerId,
            discovery: { enabled: true, asLocalhost: true },
        });

        // Get the network (channel) our contract is deployed to
        const network = await gateway.getNetwork("mychannel");

        // Get the contract from the network
        const contract = network.getContract("ticketadda");

        // Submit the transaction to the network
        await contract.submitTransaction(
            "createPassenger",
            passengerId,
            name,
            age,
            gender,
            true
        );
        console.log(`Passenger ${passengerId} has been created`);

        // Disconnect from the gateway
        gateway.disconnect();
    } catch (error) {
        console.error(`Failed to create passenger: ${error}`);
        process.exit(1);
    }
}

async function deletePassenger(passengerId) {
    try {
        // Load the network configuration
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

        // Create a new file system wallet
        const walletPath = path.join(__dirname, "wallet");
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        // console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user
        const userIdentity = await wallet.get(passengerId);
        if (!userIdentity) {
            console.log(
                `An identity for the user ${userId} does not exist in the wallet`
            );
            console.log("Run the registerUser.js application before retrying");
            return;
        }

        // Create a new gateway
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: userIdentity,
            discovery: { enabled: true, asLocalhost: true },
        });

        // Get the network and contract
        const network = await gateway.getNetwork("mychannel");
        const contract = network.getContract("ticketadda");

        // Call the deletePassenger method
        // const passengerId = 'passenger1';
        await contract.submitTransaction("deletePassenger", passengerId);

        console.log(`Successfully deleted passenger ${passengerId}`);

        // Disconnect from the gateway
        gateway.disconnect();
    } catch (error) {
        console.error(`Failed to delete passenger: ${error}`);
        process.exit(1);
    }
}

async function enrollAdmin() {
    try {
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

        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities["ca.org1.example.com"];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(
            caInfo.url,
            { trustedRoots: caTLSCACerts, verify: false },
            caInfo.caName
        );

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(__dirname, "wallet");
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const identity = await wallet.get("admin");
        if (identity) {
            console.log(
                'An identity for the admin user "admin" already exists in the wallet'
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
            mspId: "Org1MSP",
            type: "X.509",
        };
        await wallet.put("admin", x509Identity);
        console.log(
            'Successfully enrolled admin user "admin" and imported it into the wallet'
        );
    } catch (error) {
        console.error(`Failed to enroll admin user "admin": ${error}`);
        process.exit(1);
    }
}

async function queryPassenger(passengerId) {
    try {
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

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(__dirname, "wallet");
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(passengerId);
        if (!identity) {
            console.log(
                `An identity for the user ${passengerId} does not exist in the wallet`
            );
            console.log("Run the registerUser.js application before retrying");
            return;
        }
        console.log("current user has identity in wallet");

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: passengerId,
            discovery: { enabled: true, asLocalhost: true },
        });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork("mychannel");

        // Get the contract from the network.
        const contract = network.getContract("ticketadda");

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction(
            "getPassengerDetails",
            passengerId
        );
        console.log(
            `Transaction has been evaluated, result is: ${result.toString()}`
        );

        return result.toString();
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

async function registerPassenger(firstName, lastName, email, age, gender) {
    try {
        // Load the network configuration
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

        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities["ca.org1.example.com"].url;
        const ca = new FabricCAServices(caURL);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(__dirname, "wallet");
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userIdentity = await wallet.get(email);
        if (userIdentity) {
            console.log(
                `An identity for the user "${email}" already exists in the wallet`
            );
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminIdentity = await wallet.get("admin");
        if (!adminIdentity) {
            console.log(
                'An identity for the admin user "admin" does not exist in the wallet'
            );
            console.log("Run the enrollAdmin.js application before retrying");
            return;
        }

        // Build a user object for authenticating with the CA
        const provider = wallet
            .getProviderRegistry()
            .getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, "admin");

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register(
            {
                affiliation: "org1.department1",
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
            mspId: "Org1MSP",
            type: "X.509",
        };
        await wallet.put(email, x509Identity);
        console.log(
            `Successfully registered and enrolled user "${email}" and imported it into the wallet`
        );
    } catch (error) {
        console.error(`Failed to register user "${email}": ${error}`);
        process.exit(1);
    }

    createPassenger(email, firstName, age, gender);
}

async function updatePassenger(passengerId, name, age, gender) {
    try {
        // Load connection profile; will be used to locate a gateway
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

        // Create a new file system based wallet for managing identities
        const walletPath = path.join(__dirname, "wallet");
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // Check to see if we've already enrolled the user
        const identity = await wallet.get(passengerId);
        if (!identity) {
            console.log(
                `An identity for the user ${passengerId} does not exist in the wallet`
            );
            console.log("Run the registerUser.js application before retrying");
            return;
        }

        // Create a new gateway for connecting to our peer node
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: passengerId,
            discovery: { enabled: true, asLocalhost: true },
        });

        // Get the network (channel) our contract is deployed to
        const network = await gateway.getNetwork("mychannel");

        // Get the contract from the network
        const contract = network.getContract("ticketadda");

        // Submit the transaction to the network
        await contract.submitTransaction(
            "updatePassenger",
            passengerId,
            name,
            age,
            gender,
            true
        );
        // ===============================Delete later======================================
        // await contract.submitTransaction('createTransportProvider', 'Bus1', 'Aditya', 'Bus', 'delhi to goa', 100)
        console.log(`Passenger ${passengerId} has been updated`);
        // console.log(`Transporatation has been created`);

        // Disconnect from the gateway
        await gateway.disconnect();
    } catch (error) {
        console.error(`Failed to update passenger: ${error}`);
        process.exit(1);
    }
}

// Call the createPassenger function
// enrollAdmin();
// registerPassenger("Deepak", "Raj", "deepak@gmail", 23, "Male");
// enrollAdmin();
// deletePassenger('deepak@gmail');
// registerUser();
// queryPassenger('adi@gmail.com');
// updatePassenger('deepakraj@example.com', 'Deepak Raj', 24, 'male');

module.exports = {
    createPassenger,
    registerPassenger,
    updatePassenger,
    deletePassenger,
    queryPassenger,
};
