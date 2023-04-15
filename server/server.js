'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

const { deletePassenger } = require('./../ticketadda/javascript/invokePassenger');
const { queryPassenger} = require('./../ticketadda/javascript/invokePassenger');
const { registerPassenger} = require('./../ticketadda/javascript/invokePassenger');
const { updatePassenger} = require('./../ticketadda/javascript/invokePassenger');

const { registerTransporter} = require('./../ticketadda/javascript/invokeTransport');
const { createModeOfTransport} = require('./../ticketadda/javascript/invokeTransport');
const { deleteModeOfTransport} = require('./../ticketadda/javascript/invokeTransport');
const { getTransportation} = require('./../ticketadda/javascript/invokeTransport');
const { updateTransportationDetails} = require('./../ticketadda/javascript/invokeTransport');
const { deleteTransportProvider} = require('./../ticketadda/javascript/invokeTransport');


// Configure body-parser middleware to parse JSON
app.use(bodyParser.json());

// Create a new passenger
app.get('/passengers', async (req, res) => {
  const passengerId = req.query.passengerId;
  const name = req.query.name;
  const age = req.query.age;
  const gender = req.query.gender;

  try {
    await registerPassenger(passengerId, name, age, gender);
    res.status(201).send(`Passenger ${passengerId} has been created`);
  } catch (error) {
    console.error(`Failed to create passenger: ${error}`);
    res.status(500).send('Failed to create passenger');
  }
});

app.get('/deletePassengers', async (req, res) => {
  const passengerId = req.query.passengerId;
  try {
    await deletePassenger(passengerId);
    res.status(201).send(`Passenger ${passengerId} has been deleted`);
  } catch (error) {
    console.error(`Failed to delete passenger: ${error}`);
    res.status(500).send('Failed to delete passenger');
  }
});

app.get('/queryPassengers', async (req, res) => {
  const passengerId = req.query.passengerId;
  try {
    const result =  queryPassenger(passengerId);
    res.status(201).send(`Transaction has been evaluated, result is: ${result.toString()}`);
  } catch (error) {
    console.error(`Failed to query passenger: ${error}`);
    res.status(500).send('Failed to query passenger');
  }
});

app.get('/updatePassengers', async (req, res) => {
  const passengerId = req.query.passengerId;
  const name = req.query.name;
  const age = req.query.age;
  const gender = req.query.gender;
  try {
    await updatePassenger(passengerId, name, age, gender);
    res.status(201).send(`Passenger ${passengerId} has been updated`);
  } catch (error) {
    console.error(`Failed to update passenger: ${error}`);
    res.status(500).send('Failed to update passenger');
  }
});


///Create Transport

app.get('/transporter', async (req, res) => {

  
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;
  const email = req.query.email;
  const address = req.query.address;
  const contactNumber = req.query.contactNumber;

  try {
    await registerTransporter(firstName, lastName, email, address, contactNumber);
    res.status(201).send(`Successfully registered and enrolled user "${email}" and imported it into the wallet`);
  } catch (error) {
    console.error(`Failed to register user "${email}": ${error}`);
    res.status(500).send('Failed to register transporter');
  }
});


app.get('/transport', async (req, res) => {

  
  const transportID = req.query.transportID;
  const name1 = req.query.name1;
  const capacity = req.query.capacity;
  const speed = req.query.speed;
  const source = req.query.source;
  const destination = req.query.destination;

  try {
    const result = createModeOfTransport( transportID, name1, capacity, speed, source ,destination) ;
    console.log(`Transaction result: ${result.toString()}`);
    res.status(201).send(`Transaction result: ${result.toString()}`);
  } catch (error) {
    console.error(`Failed to invoke chaincode:: ${error}`);
    res.status(500).send('Failed to register transport');
  }
});

app.get('/deleteTransport', async (req, res) => {

  
  const transportID = req.query.transportID;
  try {
    const result = deleteModeOfTransport(transportID);
    console.log(`Transaction result: ${result.toString()}`);
    res.status(201).send(`Transaction result: ${result.toString()}`);
  } catch (error) {
    console.error(`Failed to invoke chaincode:: ${error}`);
    res.status(500).send('Failed to delete transport');
  }
});

app.get('/getTransport', async (req, res) => {

  
  const transportID = req.query.transportID;
  const busID = req.query.busID;
  
  try {
    const result = getTransportation( transportID, busID);
    console.log(`Transaction result: ${result.toString()}`);
    res.status(201).send(`Transaction result: ${result.toString()}`);
  } catch (error) {
    console.error(`Failed to invoke chaincode:: ${error}`);
    res.status(500).send('Failed to get details');
  }
});

app.get('/updateTransport', async (req, res) => {

  
  const transportID = req.query.transportID;
  const name1 = req.query.name1;
  const capacity = req.query.capacity;
  const speed = req.query.speed;
  const source = req.query.source;
  const destination = req.query.destination;
  
  try {
    const result = updateTransportationDetails(transportID, name1, capacity, speed, source, destination);

    console.log(`Transaction result: ${result.toString()}`);
    res.status(201).send(`Transaction updated: ${result.toString()}`);
  } catch (error) {
    console.error(`Failed to invoke chaincode:: ${error}`);
    res.status(500).send('Failed to update details');
  }
});

app.get('/deleteTransport', async (req, res) => {
  
  const providerID = req.query.providerID;
  
  try {
    const result = deleteTransportProvider(providerID);

    console.log(`Transaction result: ${result.toString()}`);
    res.status(201).send(`Transaction updated: ${result.toString()}`);
  } catch (error) {
    console.error(`Failed to invoke chaincode:: ${error}`);
    res.status(500).send('Failed to delete transporter');
  }
});





// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
