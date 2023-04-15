import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const DeletePassenger = ({ onDelete }) => {
  const [passengerID, setPassengerID] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onDelete(passengerID);
    setPassengerID("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="passengerID">
        <Form.Label>Passenger ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Passenger ID"
          value={passengerID}
          onChange={(e) => setPassengerID(e.target.value)}
        />
      </Form.Group>

      <Button variant="danger" type="submit">
        Delete
      </Button>
    </Form>
  );
};

export default DeletePassenger;
