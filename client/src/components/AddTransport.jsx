import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const AddTransportForm = () => {
  const [transportID, setTransportID] = useState("");
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [speed, setSpeed] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the submitted data
    console.log({
      transportID,
      name,
      capacity,
      speed,
      source,
      destination,
      type,
    });
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

        <Form.Group controlId="type">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddTransportForm;
