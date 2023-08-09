import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ResetPassword from "./components/Auth/ResetPassword";
import VerifyEmail from "./components/Auth/VerifyEmail";
import TradingView from "./components/TradingView/TradingView";

import Home from "./components/Main/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/resetpassword" component={ResetPassword} />
        <Route path="/verify-email" component={VerifyEmail} />
        <Route path="/trading" component={TradingView} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
