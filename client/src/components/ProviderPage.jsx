import { useState } from "react";
import Sidebar from "./SidebarTranport";
import AddTransportForm from "./AddTransport";
import TransportDeleter from "./DeleteTransport";
import UpdateTransportationDetails from "./UpdateTransport";
import CreatePassengerProvider from "./AddTransportProvider";
import DeleteTransportProvider from "./DeleteTransportProvider";

function ProviderPage() {
  const [selectedMenuItem, setSelectedMenuItem] = useState("addtransport"); // set initial value to "addtransport"

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
          {selectedMenuItem === "addtransport" && <AddTransportForm />}
          {selectedMenuItem === "deletetransport" && <TransportDeleter />}
          {selectedMenuItem === "updatetransport" && (
            <UpdateTransportationDetails />
          )}
          {selectedMenuItem === "addtransportprovider" && (
            <CreatePassengerProvider />
          )}
          {selectedMenuItem === "deletetransportprovider" && (
            <DeleteTransportProvider />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProviderPage;
