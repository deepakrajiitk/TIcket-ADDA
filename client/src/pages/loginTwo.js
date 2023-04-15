import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../assets/static/css/style_loginTwo.css";

function Show() {
  const [transport, showTransport] = useState({
    source: "",
    destination: "",
    numTicket: "",
    startDate: "",
    endDate: "",

  });

  const handleChange = (event) => {
    showTransport({ ...transport, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(passenger);
    try {
      const response = await axios.get("http://localhost:5000/showTransport", {
        params: transport,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div id="booking" class="section">
      <div class="section-center">
        <div class="container">
          <div class="row">
            <div class="booking-form">
              <form>
                <div class="form-group">
                  <input
                    class="form-control"
                    type="tel"
                    placeholder="Enter an origin location"
                    value={transport.source}
                  ></input>
                  <span class="form-label">Pickup Location</span>
                </div>
                <div class="form-group">
                  <input
                    class="form-control"
                    type="tel"
                    placeholder="Enter a destination location"
                    value={transport.destination}
                  ></input>
                  <span class="form-label">Destination Location</span>
                </div>
                <div class="form-group">
                  <input
                    className="form-control"
                    type="tel"
                    placeholder="Enter Number of Passenger"
                    value={transport.numTicket}
                  ></input>
                  <span class="form-label">Passenger Numbers</span>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <input class="form-control" type="date" required value={transport.startDate}>

                      </input>
                      <span class="form-label">From Date</span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <input class="form-control" type="date" required value={transport.endDate}></input>
                      <span class="form-label">To Date</span>
                    </div>
                  </div>
                </div>
                <div class="form-btn">
                  <Link to="/tkt_det">
                    <button class="submit-btn">Search</button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Show;
