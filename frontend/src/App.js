import React, { useEffect } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Settings from "./pages/settings";
import UserProfile from "./pages/UserProfile.js";
import TopicPage from "./pages/TopicPage";
import Topics from "./pages/Topics.js";
import Users from "./pages/Users";
import Account from "./pages/Account";
import AddPost from "./pages/AddPost";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from "./store";
import { Provider } from "react-redux";
import setAuthenticationToken from "./middleware/setAuthenticationToken";
import { userLoaded } from "./actions/auth.actions";
import IsLoggedInRoute from "./routes/IsLoggedInRoute";
import PrivateRoute from "./routes/PrivateRoute";
import "./App.css";
import ChangePassword from "./pages/ChangePassword";



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
        <PrivateRoute path="/settings" exact component={Settings} />
        <PrivateRoute path="/change-password" exact component={ChangePassword} />
        <PrivateRoute path="/add-hate" exact component={AddPost} />
        <PrivateRoute path="/account" exact component={Account} />
        <PrivateRoute exact path="/users" exact component={Users} />
        <PrivateRoute exact path="/users/user/:user_id" exact component={UserProfile} />
        <Route exact path="/topics" exact component={Topics} />
        <Route exact path="/topics/topic/:topic_id" exact component={TopicPage} />
  
      </Switch>
    </Provider>

</Router>
  )
}

export default App
