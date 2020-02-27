
//importować od razu weather.main bo inaczej jest dwa razy zamieniane w groups i weather

import React from "react";
import Location from './components/location';
import Content from './components/content';
import Error from './components/error';
import Search from './components/search';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

 const App =()=>{

  return (    
        <Router> 
              <Search /> 
              <Switch>
                <Route exact path="/">
                  <Location />
                </Route>
                <Route path="/city">
                  <Content />
                </Route>
                <Route path="/404">
                  <Error />
                </Route>
              </Switch>
        </Router>     
  );
}
    
 export default App;