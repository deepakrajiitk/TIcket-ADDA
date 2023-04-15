import { Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import AboutPage from "./components/AboutPage";
import HomePage from "./components/HomePage";
import MyNavbar from "./components/MyNavBar";
import ProviderPage from "./components/ProviderPage";

function App() {
  return (
    <>
      <MyNavbar />
      <Routes>
        <Route exact path="/" element={<ProviderPage />} />
        {/* <Route exact path="/" element={<HomePage />} /> */}
        <Route exact path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default App;
