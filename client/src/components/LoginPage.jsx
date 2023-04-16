import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginPageForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
    };
    try {
      setResponseMessage("Processing.....");
      const response = await axios.post("http://localhost:5000/login", data);
      console.log(response.data);
      setResponseMessage(response.data.message);
      setEmail("");
      setPassword("");
      navigate('/')
    } catch (error) {
      console.error(error, "----------------------------------");
      setResponseMessage(error.response.data.message);
    }
  };

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {responseMessage && (
        <p style={{ marginTop: "1rem" }}>{responseMessage}</p>
      )}
    </Container>
  );
};

export default LoginPageForm;
