import React,{ useState} from "react";
import StartPage from './components/startpage';
import ContentPage from './components/contentpage';
import ErrorPage from './components/errorpage';
import Search from './components/search';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

  const App =()=>{
  const [path, setPath] = useState("/city");
  const getPath =(value)=>{setPath(value);} /*defines callback that will modify Route so it leads to given city*/
  
  return (    
        <Router> 
          <Search getPath ={getPath} /> {/*sends callback for new path*/}
          <Switch>
            <Route exact path="/">
              <StartPage />
            </Route>
            <Route path={path}>{/*path is dynamic and depends on local state */}
              <ContentPage />
            </Route>
            <Route path="/404">
              <ErrorPage />
            </Route>
          </Switch>   
        </Router>     
  );
}
export default App;