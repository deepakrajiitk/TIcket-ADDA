import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const ValidateTicket = ({ onValidate }) => {
  const [bookingID, setBookingID] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onValidate(bookingID);
    setBookingID("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="bookingID">
        <Form.Label>Booking ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Booking ID"
          value={bookingID}
          onChange={(e) => setBookingID(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Validate
      </Button>
    </Form>
  );
};

export default ValidateTicket;
