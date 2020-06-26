import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import firebase from './initFire';

export const routes = {
  Login: "/",
  Home: "/:window"
}

function App() {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(authUser => {
      authUser
        ? localStorage.setItem('authUser', JSON.stringify(authUser))
        : localStorage.removeItem('authUser')
      });
  }, []);
  return (
    <BrowserRouter>
      <Route exact path={routes.Login} render={(props) => (
        localStorage.getItem('authUser') == null
          ? <Login {...props} />
          : <Redirect to={"/roles"} />
      )} />
      <Route exact path={routes.Home} render={(props) => (
        localStorage.getItem('authUser') != null
          ? <Home {...props} />
          : <Redirect to={routes.Login} />
      )} />
    </BrowserRouter>
  );
}

export default App;
