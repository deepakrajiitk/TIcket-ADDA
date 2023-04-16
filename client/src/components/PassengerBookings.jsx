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
      const response = await axios.get("http://localhost:5000/getDetails", {
        params: data1
      });
      // console.log(response.data);

  
      setBookings(response.data);
    } catch (error) {
      console.log(error);
    }

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
                <p>Booking ID: {booking.ID}</p>
                <p>Transport ID: {booking.TransportID}</p>
                <p>Price: {booking.Price}</p>
                <p>Date Booked: {booking.DateBooked}</p>
                <p>Status: {booking.Status}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default PassengerBookings;
