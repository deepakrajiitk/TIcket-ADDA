import { BrowserRouter, Route, Routes } from "react-router-dom";

import Show from "./pages/loginTwo";
import Home from "./pages/home";
import Ticket from "./pages/Ticket"

// import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={<Show/>} />
        <Route exact path="/" element={<Home/>} />
        <Route path="/tkt_det" element={<Ticket/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
