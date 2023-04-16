"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

// ADD THIS
var cors = require("cors");
app.use(cors());

const {
  deletePassenger,
} = require("./../ticketadda/javascript/invokePassenger");
const {
  queryPassenger,
} = require("./../ticketadda/javascript/invokePassenger");
const {
  registerPassenger,
} = require("./../ticketadda/javascript/invokePassenger");
const {
  updatePassenger,
} = require("./../ticketadda/javascript/invokePassenger");

const {
  registerTransporter,
} = require("./../ticketadda/javascript/invokeTransport");
const {
  createModeOfTransport,
} = require("./../ticketadda/javascript/invokeTransport");
const {
  deleteModeOfTransport,
} = require("./../ticketadda/javascript/invokeTransport");
const {
  getTransportation,
} = require("./../ticketadda/javascript/invokeTransport");
const {
  updateTransportationDetails,
} = require("./../ticketadda/javascript/invokeTransport");
const {
  deleteTransportProvider,
} = require("./../ticketadda/javascript/invokeTransport");
const {
  findAvailableTransport,
} = require("./../ticketadda/javascript/invokeTransport");

const { calculateTicketPrice } = require("./../ticketadda/javascript/invoke");
const { bookTicket } = require("./../ticketadda/javascript/invoke");
const { validateTicket } = require("./../ticketadda/javascript/invoke");
const { cancelBooking } = require("./../ticketadda/javascript/invoke");
const { findAvailableSeats } = require("./../ticketadda/javascript/invoke");
const {
  getAllBookingsForPassenger,
} = require("./../ticketadda/javascript/invoke");

// Configure body-parser middleware to parse JSON
app.use(bodyParser.json());

// Create a new passenger
app.get("/addpassenger", async (req, res) => {
  const passengerId = req.query.passengerId;
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;
  const age = req.query.age;
  const gender = req.query.gender;
  const isPublic = req.query.isPublic;

  console.log(passengerId);
  try {
    const responseMessage = await registerPassenger(
      firstName,
      lastName,
      passengerId,
      age,
      gender,
      isPublic
    );
    res.status(201).send(responseMessage);
  } catch (error) {
    console.error(`Failed to create passenger: ${error}`);
    res.status(500).send(error);
  }
});

app.get("/deletePassengers", async (req, res) => {
  const passengerId = req.query.passengerId;
  try {
    const response = await deletePassenger(passengerId);
    res.status(201).send(response);
  } catch (error) {
    console.error(`Failed to delete passenger: ${error}`);
    res.status(201).send("Failed to delete passenger");
  }
});

app.get("/queryPassengers", async (req, res) => {
  const passengerId = req.query.passengerId;
  try {
    const result = queryPassenger(passengerId);
    res
      .status(201)
      .send(`Transaction has been evaluated, result is: ${result.toString()}`);
  } catch (error) {
    console.error(`Failed to query passenger: ${error}`);
    res.status(201).send("Failed to query passenger");
  }
});

app.get("/updatePassengers", async (req, res) => {
  const passengerId = req.query.passengerId;
  const name = req.query.name;
  const age = req.query.age;
  const gender = req.query.gender;
  const isPublic = req.query.isPublic;
  try {
    const response = await updatePassenger(passengerId, name, age, gender, isPublic);
    res.status(201).send(response);
  } catch (error) {
    console.error(`Failed to update passenger: ${error}`);
    res.status(201).send("Failed to update passenger");
  }
});

///Create Transport

app.get("/transporter", async (req, res) => {
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;
  const email = req.query.providerID;
  const address = req.query.address;
  const contactNumber = req.query.contact;

  try {
    await registerTransporter(
      firstName,
      lastName,
      email,
      address,
      contactNumber
    );
    res
      .status(201)
      .send(
        `Successfully registered and enrolled user "${email}" and imported it into the wallet`
      );
  } catch (error) {
    console.error(`Failed to register tranporter "${email}": ${error}`);
    res.status(201).send("Failed to register transporter");
  }
});

app.get("/transport", async (req, res) => {
  const transportID = req.query.transportID;
  const name1 = req.query.name;
  const capacity = req.query.capacity;
  const speed = req.query.speed;
  const source = req.query.source;
  const destination = req.query.destination;

  try {
    const result = await createModeOfTransport(
      transportID,
      name1,
      capacity,
      speed,
      source,
      destination
    );
    // console.log(result);
    res.status(201).send(result);
  } catch (error) {
    console.error(`Failed to invoke chaincode:: ${error}`);
    res.status(201).send("Failed to register mode of transport");
  }
});

app.get("/deleteModeOfTransport", async (req, res) => {
  const transportID = req.query.transportID;
  const transporterID = req.query.transporterID;

  try {
    const result = await deleteModeOfTransport(transporterID, transportID);
    // console.log(`Transaction result: ${result.toString()}`);
    res.status(201).send(`Transaction result: ${result.toString()}`);
  } catch (error) {
    console.error(`Failed to invoke chaincode:: ${error}`);
    res.status(201).send("Failed to delete transport");
  }
});

app.get("/getTransport", async (req, res) => {
  const transportID = req.query.transportID;
  const busID = req.query.busID;

  try {
    const result = getTransportation(transportID, busID);
    console.log(`Transaction result: ${result.toString()}`);
    res.status(201).send(`Transaction result: ${result.toString()}`);
  } catch (error) {
    console.error(`Failed to invoke chaincode:: ${error}`);
    res.status(201).send("Failed to get details");
  }
});

app.get("/updateTransport", async (req, res) => {
  const transportID = req.query.transportID;
  const name1 = req.query.name;
  const capacity = req.query.capacity;
  const speed = req.query.speed;
  const source = req.query.source;
  const destination = req.query.destination;

  try {
    const result = await updateTransportationDetails(
      transportID, 
      name1,
      capacity,
      speed,
      source,
      destination
    );

    console.log(`Transaction result: ${result.toString()}`);
    res.status(201).send(`Transportation updated: ${result.toString()}`);
  } catch (error) {
    console.error(`Failed to invoke chaincode:: ${error}`);
    res.status(201).send("Failed to update details");
  }
}); 

app.get("/deleteTransport", async (req, res) => {
  const providerID = req.query.providerId;

  try {
    const result = await deleteTransportProvider(providerID);

    // console.log(`Transaction result: ${result}`);
    res.status(201).send(`Transaction: ${result}`);
  } catch (error) {
    console.error(`Failed to invoke chaincode:: ${error}`);
    res.status(201).send("Failed to delete transporter");
  }
});

app.get("/availableTransport", async (req, res) => {
  const source = req.query.source;
  const dest = req.query.destination;

  try {
    const result = await findAvailableTransport(source, dest);
    console.log(`Available Transport: ${result}`);
    if (typeof result == "string") res.status(201).send("");
    else res.status(201).send(result);
  } catch (error) {
    console.error(`Failed to invoke chaincode:: ${error}`);
    res.status(500).send("Failed to show transport");
  }
});

// Invoke
app.get("/val_Ticket", async (req, res) => {
  const bookingID = req.query.bookingID;
  try {
    const result = await validateTicket(bookingID);
    console.log(`Transaction result: ${result.toString()}`);
    res.status(201).send(`Transaction updated: ${result.toString()}`);
  } catch (error) {
    console.error(`Failed to invoke chaincode:: ${error}`);
    res.status(500).send("Failed to delete transporter");
  }
});

app.get("/getDetails", async (req, res) => {
  const passengerId = req.query.passengerId;

  try {
    const result = await getAllBookingsForPassenger(passengerId);
    // const final_res = JSON.parse(result);

    // console.log(result[0]);
    res.status(201).send(result);
  } catch (error) {
    console.error(`Failed to invoke chaincode:: ${error}`);
    res.status(500).send("Failed to delete transporter");
  }
}); 
 
app.get("/cancel_booking", async (req, res) => {
  const passengerID = req.query.passengerID;
  const bookingID = req.query.bookingID;

  try {
    const result = await cancelBooking(passengerID, bookingID);

    console.log(result);
    res.status(201).send(result);
  } catch (error) {
    console.error(`Failed to invoke chaincode:: ${error}`);
    res.status(500).send("Failed to delete transporter");
  }
}); 

app.get("/bookTicket", async (req, res) => {
  const passengerID = req.query.passengerID;
  const noSeats = req.query.noSeats;
  const transportID = req.query.transportID

  try {
    const result = await bookTicket(passengerID, transportID, noSeats);

    console.log(result);
    res.status(201).send(result);
  } catch (error) {
    console.error(`Failed to invoke chaincode:: ${error}`);
    res.status(500).send("Failed to delete transporter");
  }
}); 

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
