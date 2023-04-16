import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";


const PassengerLogin = () => {
  const [passengerID, setPassengerID] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const clickSubmit = () => {
    // define function to handle button click event
    navigate("/passenger");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      passengerID: passengerID,
      password: password
    };
    try {
      setResponseMessage("Processing.....");
      console.log(passengerID, password);
      const response = await axios.get("http://localhost:5000/addpassenger", {
        params: data,
      });
      console.log(response.data);
      setResponseMessage(response.data);
    } catch (error) {
      console.error(error, "----------------------------------");
      // setResponseMessage(error.data);
    }
  };

  return (
    <Container>
      <h1>Passenger Login</h1>
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
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        
        <Button variant="primary" type="submit" onClick={clickSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default PassengerLogin;
