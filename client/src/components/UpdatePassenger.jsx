import React, { Fragment, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const UpdatePassenger = () => {
  const [passengerID, setPassengerID] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = {
      passengerId: passengerID,
      name: name,
      age: age,
      gender: gender,
      isPublic: isAnonymous
    }
    try {
      const response = await axios.get("http://localhost:5000/updatePassengers", {
        params: data
      });
      console.log(response.data);
      setPassengerID(passengerID)
      setName(name);
      setAge(age);
      setGender(gender)
      setResponseMessage(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formPassengerID">
        <Form.Label>Passenger ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter passenger ID"
          value={passengerID}
          onChange={(e) => setPassengerID(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formAge">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formGender">
        <Form.Label>Gender</Form.Label>
        <Form.Control
          as="select"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formIsAnonymous">
        <Form.Check
          type="checkbox"
          label="Is Anonymous?"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Update Passenger
      </Button>
    </Form>
    {
      <p style={{ marginTop: "1rem" }}>{responseMessage}</p>
    }
    </Fragment>
  );
};

export default UpdatePassenger;
