import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../assets/static/css/style.css";

function Home() {
  const [passenger, setPassenger] = useState({
    passengerId: "",
    name: "",
    age: "",
    gender: "",
  });

  const handleChange = (event) => {
    console.log(event.target.value);
    setPassenger({ ...passenger, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    console.log(passenger);
    event.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/login", {
        params: passenger,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <a href="https://front.codes/" class="logo">
        <img src="https://assets.codepen.io/1462889/fcy.png" alt="" />
      </a>

      <div class="section">
        <div class="container">
          <div class="row full-height justify-content-center">
            <div class="col-12 text-center align-self-center py-5">
              <div class="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 class="mb-0 pb-3">
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input
                  class="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label for="reg-log"></label>
                <div class="card-3d-wrap mx-auto">
                  <div class="card-3d-wrapper">
                    <div class="card-front">
                      <div class="center-wrap">
                        <div class="section text-center">
                          <h4 class="mb-4 pb-3">Log In</h4>

                          <form>
                            <div class="form-group">
                              <input
                                type="email"
                                name="logemail"
                                class="form-style"
                                placeholder="Your Email"
                                id="logemail"
                                autocomplete="off"
                              />
                            </div>

                            <div class="form-group mt-2">
                              <input
                                type="password"
                                name="logpass"
                                class="form-style"
                                placeholder="Your Password"
                                id="logpass"
                                autocomplete="off"
                              />
                            </div>
                            <Link to="/search">
                              <button
                                id="login-button"
                                class="btn mt-4"
                                type="login"
                              >
                                Login
                              </button>
                            </Link>
                            {/* <!-- <p class="mb-0 mt-4 text-center"><a href="#0" class="link">Forgot your password?</a></p> --> */}
                          </form>
                        </div>
                      </div>
                    </div>

                    <div class="card-back">
                      <div class="center-wrap">
                        <div class="section text-center">
                          <h4 class="mb-4 pb-3">Sign Up</h4>

                          <form onSubmit={handleSubmit}>
                            <div class="form-group">
                              <input
                                type="email"
                                name="passengerId"
                                class="form-style"
                                placeholder="Your Email"
                                id="passengerId"
                                autocomplete="off"
                                onChange={handleChange}
                                value={passenger.passengerId}
                              />
                            </div>

                            <div class="form-group mt-2">
                              <input
                                type="text"
                                name="name"
                                class="form-style"
                                placeholder="Your Name"
                                id="logname"
                                autocomplete="off"
                                onChange={handleChange}
                                value={passenger.name}
                              />
                            </div>

                            <div class="form-group mt-2">
                              <input
                                type="text"
                                name="age"
                                class="form-style"
                                placeholder="Your Age"
                                id="age"
                                autocomplete="off"
                                onChange={handleChange}
                                value={passenger.age}
                              />
                            </div>

                            <div class="form-group mt-2">
                              <input
                                type="text"
                                name="gender"
                                class="form-style"
                                placeholder="Your Gender"
                                id="gender"
                                autocomplete="off"
                                onChange={handleChange}
                                value={passenger.gender}
                              />
                            </div>
                            <button
                              id="submit-button"
                              class="btn mt-4"
                              type="submit"
                            >
                              submit
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
