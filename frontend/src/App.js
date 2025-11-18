import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import FertilizerList from './components/FertilizerList';
import { setAuthToken } from './api/api';

export default function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setAuthToken(token);
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/fertilizer" component={FertilizerList} />
      </Switch>
    </Router>
  );
}

// 🔒 Protect private routes
function PrivateRoute({ component: Component, ...rest }) {
  const token = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
