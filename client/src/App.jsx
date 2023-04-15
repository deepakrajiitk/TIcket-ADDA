import { Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import AboutPage from "./components/AboutPage";
import HomePage from "./components/HomePage";
import MyNavbar from "./components/MyNavBar";
import ProviderPage from "./components/ProviderPage";
import PassengerPage from "./components/PassengerPage";
import TicketBooking from "./components/TicketBooking";

function App() {
  return (
    <>
      <MyNavbar />
      <Routes>
        <Route exact path="/provider" element={<ProviderPage />} />
        <Route exact path="/passenger" element={<PassengerPage />} />
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/about" element={<AboutPage />} />
        <Route exact path="/ticket-booking" element={<TicketBooking />} />
      </Routes>
    </>
  );
}

export default App;
