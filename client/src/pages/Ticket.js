import React from "react";
import TicketList from "./TicketList";

const Ticket = () => {
  const tickets = [
    { id : 1, TransProviderName: 1, src: "Ticket 1", dest: "$10", startDate: 5, time: "1", tktPrice: "100" },
    { id : 1, TransProviderName: 1, src: "Ticket 1", dest: "$10", startDate: 5, time: "1", tktPrice: "100" },
    { id : 1, TransProviderName: 1, src: "Ticket 1", dest: "$10", startDate: 5, time: "1", tktPrice: "100" },
    { id : 1, TransProviderName: 1, src: "Ticket 1", dest: "$10", startDate: 5, time: "1", tktPrice: "100" },
    { id : 1, TransProviderName: 1, src: "Ticket 1", dest: "$10", startDate: 5, time: "1", tktPrice: "100" },
    { id : 1, TransProviderName: 1, src: "Ticket 1", dest: "$10", startDate: 5, time: "1", tktPrice: "100" },
    { id : 1, TransProviderName: 1, src: "Ticket 1", dest: "$10", startDate: 5, time: "1", tktPrice: "100" },
    { id : 1, TransProviderName: 1, src: "Ticket 1", dest: "$10", startDate: 5, time: "1", tktPrice: "100" },
  ];

  return <TicketList tickets={tickets} />;
};

export default Ticket;
