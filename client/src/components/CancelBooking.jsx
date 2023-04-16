import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

const CancelBookingPage = () => {
  const [passengerID, setPassengerID] = useState("");
  const [bookingID, setBookingID] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data1 = {
      passengerID: passengerID,
      bookingID: bookingID
    };
    try {
      setResponseMessage("Processing.....");
      const response = await axios.get("http://localhost:5000/cancel_booking", {
        params: data1
      });
      console.log(response.data);
      setResponseMessage(response.data);
    } catch (error) {
      console.log(error);
    }
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
      {responseMessage && (
        <p style={{ marginTop: "1rem" }}>{responseMessage}</p>
      )}
    </Form>
  );
};

export default CancelBookingPage;
