import { useState } from "react";
import SidebarPassenger from "./SidebarPassenger";
import PassengerDeleter from "./DeletePassenger";
import UpdatePassenger from "./UpdatePassenger";
import AddPassengerForm from "./AddPasenger";
import ValidateTicket from "./ValidateTicket";
import TicketAvailabile from "./TicketAvailable";
import PassengerBookings from "./PassengerBookings";

function PassengerPage() {
  const [selectedMenuItem, setSelectedMenuItem] = useState("addpassenger"); // set initial value to "addpassenger"

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row flex-grow-1" style={{ height: "100vh" }}>
        <div className="col-md-2 bg-light">
          <SidebarPassenger
            selectedMenuItem={selectedMenuItem}
            onMenuItemClick={handleMenuItemClick}
          />
        </div>
        <div className="col-md-10">
          {selectedMenuItem === "addpassenger" && <AddPassengerForm />}
          {selectedMenuItem === "deletepassenger" && <PassengerDeleter />}
          {selectedMenuItem === "updatepassenger" && <UpdatePassenger />}
          {selectedMenuItem === "validateticket" && <ValidateTicket />}
          {selectedMenuItem === "ticketavailable" && <TicketAvailabile />}
          {selectedMenuItem === "passengerbookings" && <PassengerBookings />}
        </div>
      </div>
    </div>
  );
}

export default PassengerPage;
