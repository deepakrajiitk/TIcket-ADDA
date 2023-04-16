"use strict";

const FabricCAServices = require("fabric-ca-client");
const { Gateway, Wallets } = require("fabric-network");
const fs = require("fs");
const path = require("path");

const channelName = "mychannel";
const chaincodeName = "ticketadda";

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

async function getWallet() {
    try {
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(__dirname, "wallet");
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // console.log(`Wallet path: ${walletPath}`);

        return wallet;
    } catch (error) {
        throw new Error(`Failed to create wallet: ${error}`);
    }
}

async function checkIfUserEnrolled(user) {
    try {
        const wallet = await getWallet();
        const userIdentity = await wallet.get(user);
        if (userIdentity) {
            return true;
        }
        return false;
    } catch (error) {
        throw new Error(
            `Failed to check if user "${user}" is enrolled: ${error}`
        );
    }
}

async function connectToGateway(user) {
    try {
        const wallet = await getWallet();
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: user,
            discovery: { enabled: true, asLocalhost: true },
        });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channelName);

        // Get the contract from the network.
        const contract = network.getContract(chaincodeName);

        return { gateway, contract };
    } catch (error) {
        throw new Error(`Failed to connect to gateway: ${error}`);
    }
}

async function enrollUserToWallet(email, firstName, lastName) {
    try {
        const wallet = await getWallet();

        // Check to see if we've already enrolled the admin user.
        const adminIdentity = await wallet.get("admin");
        if (!adminIdentity) {
            throw new Error(`Admin user "admin" is not enrolled`);
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

        if (!enrollment) {
            throw new Error(`Failed to enroll user "${email}"`);
        }

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
            `Successfully enrolled user "${email}" and imported it into the wallet`
        );
    } catch (error) {
        throw new Error(`${error}`);
    }
}

// const args = process.argv;

// // Extract the arguments
// const arg1 = args[2]; // First argument
// const arg2 = args[3];
// const arg3 = args[4];
// const arg4 = args[5];

async function createPassenger(passengerId, name, age, gender, isPublic) {
    try {
        const { gateway, contract } = await connectToGateway(passengerId);

        // Submit the transaction to the network
        const resultBuffer = await contract.submitTransaction(
            "createPassenger",
            passengerId,
            name,
            age,
            gender,
            isPublic
        );
        const resultString = resultBuffer.toString();

        console.log(`Passenger ${passengerId} has been created`);

        // Disconnect from the gateway
        await gateway.disconnect();

        return resultString;
    } catch (error) {
        console.error(`Failed to create passenger: ${error}`);
    }
}

async function deletePassenger(passengerId) {
    try {
        // Check to see if the user is already enrolled.
        const userEnrolled = await checkIfUserEnrolled(passengerId);
        if (!userEnrolled) {
            console.log(
                `An identity for the user "${passengerId}" does not exist in the wallet`
            );
            return;
        }

        const { gateway, contract } = await connectToGateway(passengerId);

        // Call the deletePassenger method
        // const passengerId = 'passenger1';
        await contract.submitTransaction("deletePassenger", passengerId);
        const wallet = await getWallet();

        await wallet.remove(passengerId);

        console.log(`Successfully deleted passenger ${passengerId}`);

        // Disconnect from the gateway
        gateway.disconnect();
    } catch (error) {
        console.error(`Failed to delete passenger: ${error}`);
    }
}

async function queryPassenger(passengerId) {
    try {
        // Check to see if the user is already enrolled.
        const userEnrolled = await checkIfUserEnrolled(passengerId);
        if (!userEnrolled) {
            console.log(
                `An identity for the user "${passengerId}" does not exist in the wallet`
            );
            return;
        }

        const { gateway, contract } = await connectToGateway(passengerId);

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction(
            "getPassengerDetails",
            passengerId
        );
        console.log(
            `Transaction has been evaluated, result is: ${result.toString()}`
        );

        await gateway.disconnect();

        return result.toString();
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
    }
}

async function registerPassenger(
    firstName,
    lastName,
    email,
    age,
    gender,
    isPublic
) {
    try {
        let response = "";
        // Check to see if the user is already enrolled.
        const userEnrolled = await checkIfUserEnrolled(email);
        if (userEnrolled) {
            response = `An identity for the user "${email}" already exists in the wallet`;
        } else {
            // Enroll the user to the wallet.
            await enrollUserToWallet(email, firstName, lastName);

            // Create the passenger record.
            await createPassenger(email, firstName, age, gender, isPublic);

            response = `User "${email}" registered successfully.`;
        }
        console.log(response);
        return response;
    } catch (error) {
        console.error(`Failed to register user "${email}": ${error}`);
        throw error;
    }
}

async function updatePassenger(passengerId, name, age, gender, isPublic) {
    try {
        // Check to see if the user is already enrolled.
        const userEnrolled = await checkIfUserEnrolled(passengerId);
        if (!userEnrolled) {
            console.log(
                `An identity for the user "${passengerId}" does not exist in the wallet`
            );
            return;
        }

        const { gateway, contract } = await connectToGateway(passengerId);

        // Submit the transaction to the network
        await contract.submitTransaction(
            "updatePassenger",
            passengerId,
            name,
            age,
            gender,
            isPublic
        );
        console.log(`Passenger ${passengerId} has been updated`);

        // Disconnect from the gateway
        await gateway.disconnect();
    } catch (error) {
        console.error(`Failed to update passenger: ${error}`);
    }
}

async function enrollAdmin() {
    try {
        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities["ca.org1.example.com"];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(
            caInfo.url,
            { trustedRoots: caTLSCACerts, verify: false },
            caInfo.caName
        );
        // Check to see if we've already enrolled the admin user.
        const identity = await checkIfUserEnrolled("admin");
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
        const wallet = await getWallet();
        await wallet.put("admin", x509Identity);
        console.log(
            'Successfully enrolled admin user "admin" and imported it into the wallet'
        );
    } catch (error) {
        console.error(`Failed to enroll admin user "admin": ${error}`);
    }
}

// Call the createPassenger function
enrollAdmin();
// registerPassenger("Deepak", "Raj", "deepsd@gmail", 23, "Male", true);
enrollAdmin();
// registerPassenger("Deepak", "Raj", "deepak@gmail", 23, "Male", true);
// enrollAdmin();
// registerPassenger("Deepak", "Raj", "deek@gmail", 23, "Male", true);
// enrollAdmin();
deletePassenger("deek@gmail");
// registerUser();
// queryPassenger("deek@gmail");
// updatePassenger("deek@gmail", "Deepak Kumar", 24, "male");

module.exports = {
    createPassenger,
    registerPassenger,
    updatePassenger,
    deletePassenger,
    queryPassenger,
};
