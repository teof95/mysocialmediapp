import React, { useEffect } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from "./store";
import { Provider } from "react-redux";
import setAuthenticationToken from "./middleware/setAuthenticationToken";
import { userLoaded } from "./actions/auth.actions";
import IsLoggedInRoute from "./routes/IsLoggedInRoute";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import ChangePassword from "./pages/ChangePassword";



import "./App.css";


if (localStorage.getItem("token")) {
  setAuthenticationToken(localStorage.getItem("token"));
}

const App = () => {
  useEffect(() => {
    store.dispatch(userLoaded());
  }, []);
  return (
<Router>
  <Provider store={store}>
    <Navbar />
      <Switch>
        <Route exact path="/"  component={HomePage}/>
        <IsLoggedInRoute path="/register"  component={RegisterPage}/>
        <IsLoggedInRoute path="/login" component={LoginPage}/>
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/change-password" exact component={ChangePassword} />

   
      </Switch>
    </Provider>

</Router>
  )
}

export default App
