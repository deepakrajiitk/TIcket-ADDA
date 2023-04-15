import { useState } from "react";
import Sidebar from "./Sidebar";
import AddTransportForm from "./AddTransport";
import ProviderContact from "./ProviderContact";
import ProviderServices from "./ProviderService";
import TransportDeleter from "./DeleteTransport";
import UpdateTransportationDetails from "./UpdateTransport";

function ProviderPage() {
  const [selectedMenuItem, setSelectedMenuItem] = useState("info");

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row flex-grow-1">
        <div className="col-md-2 bg-light">
          <Sidebar
            selectedMenuItem={selectedMenuItem}
            onMenuItemClick={handleMenuItemClick}
          />
        </div>
        <div className="col-md-10">
          {selectedMenuItem === "addtransport" && <AddTransportForm />}
          {selectedMenuItem === "deletetransport" && <TransportDeleter />}
          {selectedMenuItem === "updatetransport" && (
            <UpdateTransportationDetails />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProviderPage;
