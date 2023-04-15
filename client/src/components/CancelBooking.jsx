import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const CancelBookingPage = () => {
  const [passengerID, setPassengerID] = useState("");
  const [bookingID, setBookingID] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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

      <Form.Group controlId="bookingID">
        <Form.Label>Booking ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Booking ID"
          value={bookingID}
          onChange={(e) => setBookingID(e.target.value)}
        />
      </Form.Group>

      <Button variant="danger" type="submit">
        Cancel Booking
      </Button>
    </Form>
  );
};

export default CancelBookingPage;
