import React, { useState } from "react";
import axios from "axios";
import { Button, Container, Form } from "react-bootstrap";

const ValidateTicket = () => {
  const [bookingID, setBookingID] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      bookingID: bookingID,
    }
    try {

      const response = await axios.get("http://localhost:5000/val_Ticket", {
        params: data
      });

      setResponseMessage(response.data)
      setBookingID("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
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
    {responseMessage && (
  <p style={{ marginTop: "1rem" }}>
    {responseMessage === "Transaction updated: true"
      ? "Valid Ticket"
      : "Invalid Ticket"}
  </p>
)}

    </Container>
  );
};

export default ValidateTicket;
