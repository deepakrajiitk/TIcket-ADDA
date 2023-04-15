import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const CreatePassengerProvider = () => {
  const [providerID, setProviderID] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the submitted data
    console.log({
      providerID,
      name,
      address,
      contact,
    });
  };

  return (
    <Container>
      <h1>Create Passenger Provider</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="providerID">
          <Form.Label>Provider ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Provider ID"
            value={providerID}
            onChange={(e) => setProviderID(e.target.value)}
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

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="contact">
          <Form.Label>Contact</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default CreatePassengerProvider;
