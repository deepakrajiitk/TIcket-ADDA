import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

const AddPassengerForm = () => {
  const [passengerID, setPassengerID] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isPublic, setIsPublic] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://example.com/api/addPassenger",
        {
          passengerID,
          name,
          age,
          gender,
          isPublic,
        }
      );
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage("Error: " + error.message);
    }
  };

  return (
    <Container>
      <h1>Add Passenger</h1>
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

        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="isPublic">
          <Form.Check
            type="checkbox"
            label="Is Public"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
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

export default AddPassengerForm;
