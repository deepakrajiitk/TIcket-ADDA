import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

const ValidateTicket = () => {
  const [bookingID, setBookingID] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      bookingID: bookingID,
    }
    try {
      console.log("abcd");
      const response = await axios.get("http://localhost:5000/val_Ticket", {
        params: data
      });
      console.log(response.data);
      setBookingID("");
    } catch (error) {
      console.error(error);
    }
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
