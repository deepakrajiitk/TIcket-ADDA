'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const { createPassenger } = require('./../ticketadda/javascript/invoke');

// Configure body-parser middleware to parse JSON
app.use(bodyParser.json());

// Create a new passenger
app.get('/passengers', async (req, res) => {
  const passengerId = req.query.passengerId;
  const name = req.query.name;
  const age = req.query.age;
  const gender = req.query.gender;

  try {
    await createPassenger(passengerId, name, age, gender);
    res.status(201).send(`Passenger ${passengerId} has been created`);
  } catch (error) {
    console.error(`Failed to create passenger: ${error}`);
    res.status(500).send('Failed to create passenger');
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
