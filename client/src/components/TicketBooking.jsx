import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const TicketBooking = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const transportId = searchParams.get("transportId");

  const [passengerID, setPassengerId] = useState("");
  const [noSeats, setNoSeats] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // TODO: handle booking logic
    const data = {
      transportID : transportId,
      passengerID: passengerID,
      noSeats: noSeats
    } 
    try {
      setResponseMessage("Processing.....");
      const response = await axios.get("http://localhost:5000/bookTicket", {
        params: data
      });
      setResponseMessage(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
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
            value={passengerID}
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
      {responseMessage && (
        <p style={{ marginTop: "1rem" }}>{responseMessage}</p>
      )}
    </Container>
  );
};

export default TicketBooking;
