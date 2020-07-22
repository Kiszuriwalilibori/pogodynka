import React,{ useState} from "react";
import LandingPage from './LandingPage';
import CollectedWeatherInfos from './CollectedWeatherInformations/CollectedWeatherInfos';
import ErrorMessage from './ErrorMessage';
import SearchSection from './SearchSection';
import * as ROUTES from'../js/routes';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

  const App =()=>{
  const [path, setPath] = useState("/city");
  const getPath =(value)=>{setPath(value);} /*defines callback that will modify Route so it leads to given city*/
  
  return (    
    <Router basename={process.env.PUBLIC_URL}>  
      <Switch>
        <Route exact path={ROUTES.LANDING}>
          <LandingPage />
        </Route>
        <Route path ={ROUTES.SEARCH}>
          <SearchSection getPath ={getPath} /> {/*sends callback for new path*/}
        </Route>
        <Route path={path}>{/*path is dynamic and depends on local state */}
          <CollectedWeatherInfos />
        </Route>
        <Route path={ROUTES.ERROR}>
          <ErrorMessage />
        </Route>
      </Switch>   
    </Router>     
);
}
export default App;