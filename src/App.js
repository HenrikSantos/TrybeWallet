import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

import './App.css';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={ (props) => <Login { ...props } /> }
      />
      <Route
        exact
        path="/carteira"
        render={ (props) => <Wallet { ...props } /> }
      />
    </Switch>
  );
}

export default App;
