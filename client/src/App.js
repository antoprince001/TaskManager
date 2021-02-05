import React from 'react';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './home';
import Update from './update';


const App = () =>{
  return ( 
  
  <div className="container">
    <Router>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/delete" component={Update} />
      </Switch>  
    </Router>
  </div>
  )
};

export default App;
