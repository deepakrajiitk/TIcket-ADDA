import { useState } from "react";
import Sidebar from "./sidebarLogin";
import PassengerLogin from "./loginPage";
import AddPassengerForm from "./AddPasenger";

function LoginSignup() {
  const [selectedMenuItem, setSelectedMenuItem] = useState("login"); // set initial value to "addtransport"

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row flex-grow-1" style={{ height: "100vh" }}>
        <div className="col-md-2 bg-light">
          <Sidebar
            selectedMenuItem={selectedMenuItem}
            onMenuItemClick={handleMenuItemClick}
          />
        </div>
        <div className="col-md-10">
          {selectedMenuItem === "login" && <PassengerLogin />}
          {selectedMenuItem === "signup" && <AddPassengerForm />}
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
