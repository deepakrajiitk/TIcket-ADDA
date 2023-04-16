import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

const CreateTransportProvider = () => {
  const [providerID, setProviderID] = useState("");
  const [firstName, setName] = useState("");
  const [lastName, setName2] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the submitted data
    const data1 = {
      providerID: providerID,
      firstName: firstName,
      lastName: lastName,
      address: address,
      contact: contact,
    };
    try {
      const response = axios.get("http://localhost:5000/transporter", {
        params: data1
      });
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <Container>
      <h1>Create Transport Provider</h1>
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

        <Form.Group controlId="firstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="lastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setName2(e.target.value)}
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

export default CreateTransportProvider;
