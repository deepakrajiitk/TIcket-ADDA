import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TicketAvailability = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [tickets, setTickets] = useState([]);
  const [searched, setSearched] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();

    const data1 = {
      source: source,
      destination: destination,
    };

    try {
      const response = await axios.get(
        "http://localhost:5000/availableTransport",
        {
          params: data1,
        }
      );
      if (response == "") {
        setTickets([]);
      } else setTickets(response.data);
      setSearched(true);
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
      {searched && tickets.length === 0 ? (
        <p>No tickets available for this route.</p>
      ) : (
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket.ID}>
              <p>Transport ID: {ticket.ID}</p>
              <p>Name: {ticket.Name}</p>
              <p>Source: {ticket.Source}</p>
              <p>Destination: {ticket.Destination}</p>
              <p>Capacity: {ticket.Capacity}</p>
              <p>Speed: {ticket.Speed}</p>
              <p>Seats Booked: {ticket.SeatsBooked}</p>
              <Button
                variant="success"
                onClick={() => handleBookTicket(ticket.ID)}
              >
                Book Ticket
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default TicketAvailability;
