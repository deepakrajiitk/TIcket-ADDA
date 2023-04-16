import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email,
      password
    };

    try {
      setResponseMessage("Processing.....");
      const response = await axios.post("http://localhost:5000/signup", data);
      console.log(response.data);
      setResponseMessage(response.data);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      setResponseMessage(error.response.data);
    }
  };

  return (
    <Container>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>

      {responseMessage && (
        <p style={{ marginTop: "1rem" }}>{responseMessage}</p>
      )}
    </Container>
  );
};

export default SignupForm;
