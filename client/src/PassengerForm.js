import React, { useState } from 'react';
import axios from 'axios';

function PassengerForm() {
  const [passenger, setPassenger] = useState({
    passengerId: '',
    name: '',
    age: '',
    gender: ''
  });

  const handleChange = (event) => {
    setPassenger({ ...passenger, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/passengers', {
      params: passenger
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Passenger ID:
        <input type="text" name="passengerId" value={passenger.passengerId} onChange={handleChange} />
      </label>
      <br />
      <label>
        Name:
        <input type="text" name="name" value={passenger.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Age:
        <input type="number" name="age" value={passenger.age} onChange={handleChange} />
      </label>
      <br />
      <label>
        Gender:
        <input type="text" name="gender" value={passenger.gender} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Create Passenger</button>
    </form>
  );
}

export default PassengerForm;
