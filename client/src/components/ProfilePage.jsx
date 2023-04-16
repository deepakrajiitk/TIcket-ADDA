import { useState } from "react";
import LoginForm from "./LoginPage";
import SidebarProfile from "./SidebarProfile";
import SignpupForm from "./SignupPage";

function ProfilePage() {
  const [selectedMenuItem, setSelectedMenuItem] = useState("loginpage"); // set initial value to "addtransport"

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row flex-grow-1" style={{ height: "100vh" }}>
        <div className="col-md-2 bg-light">
          <SidebarProfile
            selectedMenuItem={selectedMenuItem}
            onMenuItemClick={handleMenuItemClick}
          />
        </div>
        <div className="col-md-10">
          {selectedMenuItem === "loginpage" && <LoginForm />}
          {selectedMenuItem === "signuppage" && <SignpupForm />}
        </div>
      </div>    
    </div>
  );
}

export default ProfilePage;
