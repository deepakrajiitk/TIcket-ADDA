import { Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import AboutPage from "./components/AboutPage";
import HomePage from "./components/HomePage";
import MyNavbar from "./components/MyNavBar";
import ProviderPage from "./components/ProviderPage";
import PassengerPage from "./components/PassengerPage";
import TicketBooking from "./components/TicketBooking";
import PassengerLogin from "./components/loginPage";
import LoginSignup from "./components/loginSignup"

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
         <Route exact path = "/loginPass" element = {<PassengerLogin/>}/>
      </Routes>
      {/* <PassengerLogin/> */}
    </>
  );
}

export default App;
