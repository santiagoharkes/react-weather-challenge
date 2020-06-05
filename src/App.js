import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Components/Home'
import CityDetails from './Components/CityDetails'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:id" component={CityDetails} /> 
      </Switch>
    </BrowserRouter>
  );
}

export default App;
