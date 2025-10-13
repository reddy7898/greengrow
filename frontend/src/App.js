import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import FertilizerList from './components/FertilizerList';
import { setAuthToken } from './api/api';

const token = localStorage.getItem('token');
if (token) setAuthToken(token);

function App() {
  return (
    <Router>
      <Switch>
        {/* Redirect root based on auth */}
        <Route exact path="/">
          {token ? <Redirect to="/fertilizer" /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          {token ? <Redirect to="/fertilizer" /> : <Login />}
        </Route>

        <Route path="/register">
          {token ? <Redirect to="/fertilizer" /> : <Register />}
        </Route>

        <Route path="/fertilizer">
          {token ? <FertilizerList /> : <Redirect to="/login" />}
        </Route>

        {/* fallback route */}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
