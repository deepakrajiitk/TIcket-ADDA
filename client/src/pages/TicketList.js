import React, { Component, Fragment } from 'react';
import './style_ticket.css'


const handleBuyTicket = (ticketId) => {
    // handle logic to buy ticket with the given ticketId
  }

function Table(props) {
  const tableData = props.tableData;

  return (
    <tbody>
      {tableData.map(row => (
        <tr key={row.id} className="alert" role="alert">
          <th scope="row">{row.id}</th>
          <td>{row.TransProviderName}</td>
          <td>{row.src}</td>
          <td>{row.dest}</td>
          <td>{row.startDate}</td>
          <td>{row.time}</td>
          <td>{row.tktPrice}</td>

          <td>
            <button onClick={() => handleBuyTicket(row.id)}>Buy</button>
          </td>

          <td>
            <a href="#" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true"><i className="fa fa-close"></i></span>
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  );
}


class TicketList extends Component {
  render() {
    return (

      <section class="ftco-section">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-6 text-center mb-5">
					<h2 class="heading-section">TICKETS AVAILABLE FOR THIS ROUTE</h2>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="table-wrap">
						<table class="table">
						  <thead class="thead-dark">
                                <tr>
                                <th>Serial No.</th>
                                <th>TransProviderName</th>
                                <th>Source</th>
                                <th>Destination</th>
                                <th>Start Date</th>
                                    <th>Departure Time</th>
                                    <th>Ticket Price</th>
                                <th>Buy Ticket</th>
                                <th/>
                                </tr>
						  </thead>

                            <Table tableData={this.props.tickets} />

						</table>
					</div>
				</div>
			</div>
		</div>
	</section>
    );
  }
}

export default TicketList;
