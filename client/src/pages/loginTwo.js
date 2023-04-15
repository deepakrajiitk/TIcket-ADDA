import React, { Component } from 'react';
import '../../public/assets/static/css/style_loginTwo.css'

class Show extends Component{
    render() {
        return (
            <div id="booking" class="section">
                <div class="section-center">
                    <div class="container">
                        <div class="row">
                            <div class="booking-form">
                                <form>
        
                                    <div class="form-group">
                                        <input class="form-control" type="tel" placeholder="Enter an origin location"></input>
                                        <span class="form-label">Pickup Location</span>
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" type="tel" placeholder="Enter a destination location"></input>
                                        <span class="form-label">Destination Location</span>
                                    </div>
                                    <div class="form-group">
                                        <input className='form-control' type='tel' placeholder='Enter Number of Passenger'></input>
                                        <span class="form-label">Passenger Numbers</span>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <input class="form-control" type="date" required></input>
                                                <span class="form-label">From Date</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <input class="form-control" type="date" required></input>
                                                <span class="form-label">To Date</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-btn">
                                        <button class="submit-btn">Search</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Show;