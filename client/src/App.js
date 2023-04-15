import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Show from "./pages/loginTwo";
// import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={<Show/>} />
        <Route exact path="/" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
