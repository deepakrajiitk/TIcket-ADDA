import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const TicketBooking = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const transportId = searchParams.get("transportId");

  const [passengerId, setPassengerId] = useState("");
  const [noSeats, setNoSeats] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: handle booking logic
  };

  return (
    <Container>
      <h1>Ticket Booking</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="transportId">
          <Form.Label>Transport ID</Form.Label>
          <Form.Control type="text" value={transportId} disabled />
        </Form.Group>

        <Form.Group controlId="passengerId">
          <Form.Label>Passenger ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Passenger ID"
            value={passengerId}
            onChange={(e) => setPassengerId(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="noSeats">
          <Form.Label>No. of Seats</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter No. of Seats"
            value={noSeats}
            onChange={(e) => setNoSeats(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Book Ticket
        </Button>
      </Form>
    </Container>
  );
};

export default TicketBooking;
