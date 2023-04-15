import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

const UpdateTransportationDetails = () => {
  const [transportID, setTransportID] = useState("");
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [speed, setSpeed] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data1 = {
      transportID: transportID,
      name: name,
      capacity: capacity,
      speed: speed,
      source: source,
      destination: destination,
    };

    try {
      const response = axios.get("http://localhost:5000/updateTransport", {
        params: data1,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    // Implement your update transportation details logic here
    console.log("Transportation details updated!");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTransportID">
        <Form.Label>Transport ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter transport ID"
          value={transportID}
          onChange={(e) => setTransportID(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formCapacity">
        <Form.Label>Capacity</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formSpeed">
        <Form.Label>Speed</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter speed"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formSource">
        <Form.Label>Source</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formDestination">
        <Form.Label>Destination</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </Form.Group>


      <Button variant="primary" type="submit">
        Update Transportation Details
      </Button>
    </Form>
  );
};

export default UpdateTransportationDetails;
