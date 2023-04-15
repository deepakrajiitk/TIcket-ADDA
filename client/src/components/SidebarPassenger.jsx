import React from "react";
import { Nav } from "react-bootstrap";

function SidebarPassenger(props) {
  const handleMenuItemClick = (menuItem) => {
    props.onMenuItemClick(menuItem);
  };

  return (
    <Nav className="flex-column bg-light" id="sidebar-wrapper">
      <div className="d-flex align-items-center justify-content-center py-4">
        <img src="avatar.svg" alt="Logo" width="100" height="100" />
      </div>
      <Nav.Item>
        <Nav.Link
          className={`text-center ${
            props.selectedMenuItem === "addpassenger" ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick("addpassenger")}
        >
          Add Passenger
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          className={`text-center ${
            props.selectedMenuItem === "deletepassenger" ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick("deletepassenger")}
        >
          Delete Passenger
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          className={`text-center ${
            props.selectedMenuItem === "updatepassenger" ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick("updatepassenger")}
        >
          Update Passenger
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          className={`text-center ${
            props.selectedMenuItem === "validateticket" ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick("validateticket")}
        >
          Validate Ticket
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          className={`text-center ${
            props.selectedMenuItem === "ticketavailable" ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick("ticketavailable")}
        >
          Show Available Ticket
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          className={`text-center ${
            props.selectedMenuItem === "passengerbookings" ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick("passengerbookings")}
        >
          Show Passenger Bookings
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          className={`text-center ${
            props.selectedMenuItem === "cancelbooking" ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick("cancelbooking")}
        >
          Cancel Booking
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default SidebarPassenger;
