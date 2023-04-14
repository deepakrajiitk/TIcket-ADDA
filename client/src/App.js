import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";

import Home from "./pages/home";
import Show from "./pages/loginTwo";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/search">
          <Show />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
