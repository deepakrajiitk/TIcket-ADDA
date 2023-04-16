import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

const DeleteTransportProvider = ({ onDelete }) => {
  const [providerId, setProviderId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data1 = {
      providerId: providerId,
    };
  
    try {
      console.log(providerId);
      const response = axios.get("http://localhost:5000/deleteTransport", {
        params: data1,
      });
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1> Delete Transport Provider</h1>
      <Form.Group controlId="providerId">
        <Form.Label>Provider ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Provider ID"
          value={providerId}
          onChange={(e) => setProviderId(e.target.value)}
        />
      </Form.Group>

      <Button variant="danger" type="submit">
        Delete
      </Button>
    </Form>
  );
};

export default DeleteTransportProvider;
