import React, {useEffect} from "react"; 
import { connect } from "react-redux";
import {fetchBackgroundImage, checkGeoLocation, checkSupportForCache} from '../js/Redux/thunks';
import { finishWhenInternetExplorer } from '../js/functions';
import ProblemMessage from "./details/ProblemMessage";

import * as ROUTES from'../js/routes';
import {
  Link,
} from "react-router-dom";

  const Page = props=> {
    finishWhenInternetExplorer();
    const{fetchBackgroundImage, checkGeoLocation, checkSupportForCache} = props;

    useEffect(() => {
      fetchBackgroundImage('weather');
      checkGeoLocation();
    }, [fetchBackgroundImage]);

    useEffect(() => {checkSupportForCache();
    }, [checkSupportForCache]);
  
  
    return (
      <Link to= {ROUTES.SEARCH} style={{ textDecoration: 'none' }} >
        <article className= 'landing-page'>
          <h1 className ='header-1 landing-page__header'>Witamy w pogodynce :)</h1>
          <div className ='landing-page__welcome-text'>
          To jest wersja robocza. Mogą być błędy. Jest cały czas poprawiana i testowana. Ma jeszcze cokolwiek surowy wygląd (brak w niej chociażby ikon, planuję też dołączenie ogólnej informacji o stanie pogody w docelowej lokalizacji, pobieranie pogody dla lokalizacji ze współrzędnych, zapisywanie profilu w firebase).Kliknij gdziekoliwek, żeby przejść dalej<br />
          </div>
          <ProblemMessage />
        </article>
      </Link>
    )  
}
const mapDispatchToProps = dispatch => ({
  fetchBackgroundImage: (x) => dispatch(fetchBackgroundImage(x)),
  checkGeoLocation: ()=>dispatch(checkGeoLocation()),
  // cacheSupported: () => dispatch(cacheSupported()),
  // cacheNotEmpty: () => dispatch(cacheNotEmpty()),
  checkSupportForCache:()=>dispatch(checkSupportForCache()),
});

const LandingPage = connect(null, mapDispatchToProps)(Page);
export default LandingPage;