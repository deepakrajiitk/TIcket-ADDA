import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

const DeletePassenger = () => {
  const [passengerID, setPassengerID] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      passengerId: passengerID,
    } 
    try {
      const response = await axios.get("http://localhost:5000/deletePassengers", {
        params: data
      });
      console.log("Hellllllllooooooooooooo")
      console.log(response);
      setPassengerID("");
    } catch (error) {
      console.error(error);
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

      <Button variant="danger" type="submit">
        Delete
      </Button>
      {responseMessage && (
        <p style={{ marginTop: "1rem" }}>{responseMessage}</p>
      )}
    </Form>
  );
};

export default DeletePassenger;
