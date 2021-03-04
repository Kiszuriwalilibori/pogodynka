import React, {useEffect} from "react"; 
import { connect } from "react-redux";
import {fetchBackgroundImage, checkGeoLocation} from '../js/actions/actions';
import * as ROUTES from'../js/routes';
import {
  Link,
} from "react-router-dom";

  const Page = props=> {

    const{fetchBackgroundImage, checkGeoLocation} = props;

    useEffect(() => {
      fetchBackgroundImage('weather');
      checkGeoLocation();
    }, [fetchBackgroundImage]);
  


    return (
      <Link to= {ROUTES.SEARCH} style={{ textDecoration: 'none' }} >
        <div className= 'start__body'>
          <h1>Witamy w pogodynce :)</h1>
          <div className ='start__text'>
          To jest wersja robocza. Mogą być błędy. Jest cały czas poprawiana i testowana. Ma jeszcze cokolwiek surowy wygląd (brak w niej chociażby ikon, planuję też dołączenie ogólnej informacji o stanie pogody w docelowej lokalizacji, pobieranie pogody dla lokalizacji ze współrzędnych, zapisywanie profilu w firebase).Kliknij gdziekoliwek, żeby przejść dalej<br />
          </div>
        </div>
      </Link>
    )  
}
   
const mapDispatchToProps = dispatch => ({
  fetchBackgroundImage: (x) => dispatch(fetchBackgroundImage(x)),
  checkGeoLocation: ()=>dispatch(checkGeoLocation()),
});

const LandingPage = connect(null, mapDispatchToProps)(Page);

export default LandingPage;