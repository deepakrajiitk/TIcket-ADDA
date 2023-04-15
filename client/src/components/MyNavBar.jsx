import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./../css/Navbar.css"; // import the CSS file

function MyNavbar() {
  return (
    <Navbar bg="light" expand="lg" className="navbar-custom">
      {" "}
      {/* add the navbar-custom class */}
      <Navbar.Brand href="#home">TicketAdda</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div
          className="
                  navbar-collapse
                  justify-content-end"
        >
          <Nav className="ml-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#contact-us">Contact Us</Nav.Link>
          </Nav>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;
