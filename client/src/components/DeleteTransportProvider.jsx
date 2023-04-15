import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const DeleteTransportProvider = ({ onDelete }) => {
  const [providerId, setProviderId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onDelete(providerId);
    setProviderId("");
  };

  return (
    <Form onSubmit={handleSubmit}>
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
