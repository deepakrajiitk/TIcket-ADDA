import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

const PassengerBookings = () => {
  const [passengerId, setPassengerId] = useState("");
  const [bookings, setBookings] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // TODO: Fetch bookings for passengerId from server and update state
    const data1 = {
      passengerId: passengerId
    };
    try {
      const response = axios.get("http://localhost:5000/getDetails", {
        params: data1
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    setBookings([
      {
        id: 1,
        transportId: "TR-123",
        passengerId: passengerId,
        price: 50.0,
        departureTime: "2023-04-18T10:00:00Z",
        arrivalTime: "2023-04-18T11:30:00Z",
      },
      {
        id: 2,
        transportId: "TR-234",
        passengerId: passengerId,
        price: 75.0,
        departureTime: "2023-04-19T08:00:00Z",
        arrivalTime: "2023-04-19T10:30:00Z",
      },
    ]);
  };

  return (
    <Container>
      <h1>Passenger Bookings</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="passengerId">
          <Form.Label>Passenger ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Passenger ID"
            value={passengerId}
            onChange={(e) => setPassengerId(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>

      {bookings.length === 0 && (
        <p>No bookings found for passenger with ID {passengerId}</p>
      )}

      {bookings.length > 0 && (
        <div>
          <h2>Bookings for passenger with ID {passengerId}</h2>
          <ul>
            {bookings.map((booking) => (
              <li key={booking.id}>
                <p>Booking ID: {booking.id}</p>
                <p>Transport ID: {booking.transportId}</p>
                <p>Price: {booking.price}</p>
                <p>Departure Time: {booking.departureTime}</p>
                <p>Arrival Time: {booking.arrivalTime}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default PassengerBookings;
