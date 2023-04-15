import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const TransportDeleter = ({ onDelete }) => {
  const [transportID, setTransportID] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onDelete(transportID);
    setTransportID("");
  };

  return (
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

      <Button variant="danger" type="submit">
        Delete
      </Button>
    </Form>
  );
};

export default TransportDeleter;
