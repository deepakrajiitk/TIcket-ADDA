import { Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import AboutPage from "./components/AboutPage";
import HomePage from "./components/HomePage";
import MyNavbar from "./components/MyNavBar";
import ProviderPage from "./components/ProviderPage";
import PassengerPage from "./components/PassengerPage";
import TicketBooking from "./components/TicketBooking";
import PassengerLogin from "./components/LoginPage";
import LoginSignup from "./components/SignupPage"
import ProfilePage from "./components/ProfilePage";

function App() {
  return (
    <>
      <MyNavbar />
      <Routes>
        <Route exact path="/provider" element={<ProviderPage />} />
        <Route exact path="/passenger" element={<ProfilePage />} />
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/about" element={<AboutPage />} />
        <Route exact path="/ticket-booking" element={<TicketBooking />} />
         <Route exact path = "/loginPass" element = {<ProfilePage/>}/>
      </Routes>
      {/* <PassengerLogin/> */}
    </>
  );
}

export default App;
