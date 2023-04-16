import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

const AddPassengerForm = () => {
  const [passengerID, setPassengerID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  // const [isPublic, setIsPublic] = useState("yes");
  const [password, setPassword] = useState("");
  
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      passengerId: passengerID,
      firstName: firstName,
      lastName: lastName,
      age: age,
      gender: gender,
      password: password,
      isPublic: true,
    };
    try {
      setResponseMessage("Processing.....");
      console.log(passengerID, firstName, lastName, age, gender, true);
      const response = await axios.get("http://localhost:5000/addpassenger", {
        params: data,
      });
      console.log(response.data);
      setResponseMessage(response.data);
      setPassengerID("");
      setFirstName("");
      setLastName("");
      setAge("");
    } catch (error) {
      console.error(error, "----------------------------------");
      // setResponseMessage(error.data);
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
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
        {/* <Form.Group controlId="isPublic">
          <Form.Label>Is Public?</Form.Label>
          <Form.Control
            as="select"
            value={isPublic}
            onChange={(e) => setIsPublic(e.target.value)}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Form.Control>
        </Form.Group> */}

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="number"
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

export default AddPassengerForm;
