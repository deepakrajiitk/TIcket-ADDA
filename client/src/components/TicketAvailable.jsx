import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const TicketAvailability = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [tickets, setTickets] = useState([
    {
      id: 1,
      transportId: "T123",
      price: 10,
      departureTime: "2023-05-01T09:00:00Z",
      arrivalTime: "2023-05-01T11:00:00Z",
    },
    {
      id: 2,
      transportId: "T456",
      price: 15,
      departureTime: "2023-05-02T10:00:00Z",
      arrivalTime: "2023-05-02T12:00:00Z",
    },
    {
      id: 3,
      transportId: "T789",
      price: 20,
      departureTime: "2023-05-03T11:00:00Z",
      arrivalTime: "2023-05-03T13:00:00Z",
    },
  ]);

  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();

    const data1 = {
      source: source,
      destination: destination,
    };
  
    try {
      const response = axios.get("http://localhost:5000/AvailableTransport", {
        params: data1,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    // Perform search for available tickets
  };

  const handleBookTicket = (transportId) => {
    navigate(`/ticket-booking?transportId=${transportId}`);
  };

  return (
    <Container>
      <h1>Ticket Availability</h1>
      <Form onSubmit={handleSearch}>
        <Form.Group controlId="source">
          <Form.Label>Source</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="destination">
          <Form.Label>Destination</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>

      <h2>Available Tickets</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            <p>Ticket ID: {ticket.id}</p>
            <p>Transport ID: {ticket.transportId}</p>
            <p>Price: {ticket.price}</p>
            <p>Departure Time: {ticket.departureTime}</p>
            <p>Arrival Time: {ticket.arrivalTime}</p>
            <Button
              variant="success"
              onClick={() => handleBookTicket(ticket.transportId)}
            >
              Book Ticket
            </Button>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default TicketAvailability;
