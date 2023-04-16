import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./../css/Navbar.css"; // import the CSS file

function MyNavbar() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/homepage");
  };

  return (
    <Navbar bg="light" expand="lg" className="navbar-custom">
      {" "}
      {/* add the navbar-custom class */}
      <Navbar.Brand onClick={handleHomeClick}>TicketAdda</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div
          className="
                  navbar-collapse
                  justify-content-end"
        >
          <Nav className="ml-auto">
            <Nav.Link onClick={handleHomeClick}>Home</Nav.Link>
            <Nav.Link href="#contact-us">Contact Us</Nav.Link>
          </Nav>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;
