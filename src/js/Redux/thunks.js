import fetch from "isomorphic-fetch";
import { createURLofWeatherAPI, createResults, validate } from "../functions";
import { citiesArray } from "../fixtures";
import Unsplash, { toJson } from "unsplash-js";
import { setBackground } from "../functions";
import { accessKey } from "../fixtures";
import errorDictionary from "../errorDictionary";
import { setGeoLocationPosition, fetchWeatherFailed, getCityDataReceived, getCityForecastReceived, getGroupReceived, getDataRequested, showErrorMessage, setGeoLocationSupport } from "./reducers/reducer";

const successDispatcher = {
  weather: {
    run: (dispatch, data) => {dispatch(getCityDataReceived(data));
    },
  },
  forecast: {
    run: (dispatch, data) => {dispatch(getCityForecastReceived(data));
    },
  },
  group: {
    run: (dispatch, data) => {dispatch(getGroupReceived(data));
    },
  },
};

export function getWeather(source, city, handleFetchSuccesfullyCompleted) {
  return dispatch => {

    const handleNoData = (code, place) => {
      let message = errorDictionary[code];
      if (code !== "networkProblem" && code !== "group") message = message + place;
      dispatch(fetchWeatherFailed(message));
      return;
    };

    const table = [
      [city, "weather"],
      [city, "forecast"],
      [citiesArray, "group"],
    ];

    const readfromURL = table => {
      dispatch(getDataRequested()); //sends action that data is requested
      if (table.length) {
        let [city, code] = table.shift(); //checks whether passed argumets are not empty - if OK takes first elelment and destructurises it
        let reduced = [...table]; //copies remaining elements to new table
        fetch(createURLofWeatherAPI(code, city, source))
          // initiates connection with server where URL is dynamically created
          .then(response => response.json())
          .then(data => {
            if (validate[code](data)) {
              
              let load = createResults[code](data,city);
              successDispatcher[code].run(dispatch,load);
              reduced.length ? readfromURL(reduced) : handleFetchSuccesfullyCompleted(); //if there is still something in the table with arguments the function calls itself again(with reduced arguments) otherwise it dispatches redirect request to success page
            } else {
              handleNoData(code, city);
            } //if validation failed it calls failure handler with code(which informs at which stage it happened)
          })
          .catch(err => {
            dispatch(fetchWeatherFailed(errorDictionary[err.message]));
          });
      } // if connection is not OK it calls failure handler with network problem code
    };

    readfromURL(table);
  };
}

export function fetchBackgroundImage(subject) {
  return dispatch => {
    const unsplash = new Unsplash(accessKey);
    unsplash.photos
      .getRandomPhoto({ query: subject, orientation: "landscape" })
      .then(toJson)
      .then(json => {
        let isMobile = window.matchMedia("(max-width: 768px)").matches;
        var root = document.getElementById("root");
        root.style.backgroundSize = `cover`;
        const image = isMobile ? json.urls?.small || json.urls?.regular || json.urls?.full || json.urls?.raw : json.urls?.regular || json.urls?.full || json.urls?.raw || json.urls?.small;

        if (image) {
          root.style.background = `url(${image}) no-repeat center center fixed`;
          root.style.backgroundSize = `cover`;
          setBackground(image);
        } else {
          setBackground();
        }
      })
      .catch(err => {
        setBackground();
        dispatch(showErrorMessage(errorDictionary[err.message]));
      });
  };
}

export function checkGeoLocation() {
  return dispatch => {
    if (navigator.geolocation) {
      dispatch(setGeoLocationSupport(true));
      function getCoordsFromResponse(resp) {
        resp = resp.coords;
        let coords = { latitude: resp.latitude, longitude: resp.longitude };
        return coords;
      }
      navigator.geolocation.getCurrentPosition(position => dispatch(setGeoLocationPosition(getCoordsFromResponse(position))));
    } else {
      dispatch(setGeoLocationSupport(false));
    }
  };
}

export function getCurrentWeatherData() {}
