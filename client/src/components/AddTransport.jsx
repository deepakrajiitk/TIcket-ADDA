import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

const AddTransportForm = () => {
  const [transportID, setTransportID] = useState("");
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [speed, setSpeed] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Create an object to hold the data
    const data1 = {
      transportID: transportID,
      name: name,
      capacity: capacity,
      speed: speed,
      source: source,
      destination: destination,
    };
  
    try {
      setResponseMessage("Processing.....");
      const response = await axios.get("http://localhost:5000/transport", {
        params: data1,
      });
      console.log(response.data);
      setResponseMessage(response.data);
      setTransportID("");
      setName("");
      setCapacity("");
      setSpeed("");
      setSource("");
      setDestination("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h1>Create Mode of Transport</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="transportID">
          <Form.Label>Transport ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Transport ID"
            value={transportID}
            onChange={(e) => setTransportID(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="capacity">
          <Form.Label>Capacity</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="speed">
          <Form.Label>Speed</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Speed"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="source">
          <Form.Label>Source</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="destination">
          <Form.Label>Destination</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {responseMessage && (
        <p style={{ marginTop: "1rem" }}>{responseMessage}</p>
      )}
    </Container>
  );
};

export default AddTransportForm;
