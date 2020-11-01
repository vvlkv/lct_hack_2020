import React, { useState } from "react"

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './privateRouter';

import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Providers from "./pages/Providers";
import Events from "./pages/Events";
import OpenObject from "./pages/OpenObject";
import Objects from "./pages/Objects";
import Workers from "./pages/Workers";
import OpenProvider from "./pages/OpenProvider";
import OpenWorker from "./pages/OpenWorker";

import { AuthContext } from "./context/auth";




function App() {
    const existingTokens = localStorage.getItem("tokens");
    const [authToken, setAuthToken] = useState(existingTokens);

    const setToken = (data) => {
        console.log("set new token" + JSON.stringify(data));
        localStorage.setItem("tokens",data);
        setAuthToken(data);
    }

  return (
      <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
          <Router>
              <Route  path="/login" component={Login} />
              <Route  path="/logout" component={Logout} />
              <PrivateRoute path="/workers" component={Workers} />
              <PrivateRoute path="/companies" component={Providers} />
              <PrivateRoute path="/objects" component={Objects} />
              <PrivateRoute path="/openobject/:id" component={OpenObject} />
              <PrivateRoute path="/opencompany/:id" component={OpenProvider} />
              <PrivateRoute path="/openworker/:id" component={OpenWorker} />
              <PrivateRoute exact path="/" component={Events} />
          </Router>
      </AuthContext.Provider>
  );
}

export default App;
