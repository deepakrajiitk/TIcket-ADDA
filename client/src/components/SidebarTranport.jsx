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
            props.selectedMenuItem === "addtranport" ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick("addtransport")}
        >
          Add Transport
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          className={`text-center ${
            props.selectedMenuItem === "deletetransport" ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick("deletetransport")}
        >
          Delete Transport
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          className={`text-center ${
            props.selectedMenuItem === "updatetransport" ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick("updatetransport")}
        >
          Update Transport
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          className={`text-center ${
            props.selectedMenuItem === "addtransportprovider" ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick("addtransportprovider")}
        >
          Add Transport Provider
        </Nav.Link>
      </Nav.Item>
      <NavItem>
        <Nav.Link
          className={`text-center ${
            props.selectedMenuItem === "deletetransportprovider" ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick("deletetransportprovider")}
        >
          Delete Transport Provider
        </Nav.Link>
      </NavItem>
    </Nav>
  );
}

export default Sidebar;
