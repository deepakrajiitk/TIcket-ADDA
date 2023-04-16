import React from "react";
import { Nav } from "react-bootstrap";

function SidebarProfile(props) {
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
            props.selectedMenuItem === "loginpage" ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick("loginpage")}
        >
          Login 
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          className={`text-center ${
            props.selectedMenuItem === "signuppage" ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick("signuppage")}
        >
            Signup
          
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default SidebarProfile;
