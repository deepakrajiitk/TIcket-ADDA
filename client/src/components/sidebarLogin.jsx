import React from "react";
import { Nav, NavItem } from "react-bootstrap";


function Sidebar(props) {
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
            props.selectedMenuItem === "login" ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick("login")}
        >
          Log in
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          className={`text-center ${
            props.selectedMenuItem === "signup" ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick("signup")}
        >
          Sign Up
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Sidebar;
