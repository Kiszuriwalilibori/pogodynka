import fetch from "isomorphic-fetch";
import { createURLofWeatherAPI, createResults, validate } from "../functions";
import { initGlobalStorage, storageAvailable } from "../storage";
import { citiesArray } from "../fixtures";
import Unsplash, { toJson } from "unsplash-js";
import { setBackground } from "../functions";
import { accessKey } from "../fixtures";
import errorDictionary from "../errorDictionary";
import { setGeoLocationPosition, fetchWeatherFailed, getCityDataReceived, getCityForecastReceived, getGroupReceived, getDataRequested, showErrorMessage, setGeoLocationSupport, cacheSupported, cacheNotEmpty, setPlace, test, getFavoritesWeatherReceived } from "./reducers/reducer";

const createLabel = label => {
  return (dispatch, getState) => {
    dispatch();
  };
};

const successDispatcher = {
  weather: {
    run: (dispatch, data) => {
      dispatch(getCityDataReceived(data));
    },
  },
  forecast: {
    run: (dispatch, data) => {
      dispatch(getCityForecastReceived(data));
    },
  },
  group: {
    run: (dispatch, data) => {
      dispatch(getGroupReceived(data));
    },
  },
  favorites: {
    run: (dispatch, data) => {
      dispatch(getFavoritesWeatherReceived(data));
    },
  },
};

export function getWeather(source, city, handleFetchSuccesfullyCompleted) {
  return dispatch => {
    let place = createPlace();

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
        let [city, code] = table.shift(); //checks whether passed argumets are not empty - if OK takes first element and destructurises it
        let reduced = [...table]; //copies remaining elements to new table

        fetch(createURLofWeatherAPI(code, city, source))
          .then(response => response.json())
          .then(data => {
            if (validate[code](data)) {
              let load = createResults[code](data, city);
              successDispatcher[code].run(dispatch, load);

              if (reduced.length) {
                readfromURL(reduced);
              } else {
                dispatch(setPlace(place));
                handleFetchSuccesfullyCompleted();
              }

              //if there is still something in the table with arguments the function calls itself again(with reduced arguments) otherwise it dispatches redirect request to success page
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

    function createPlace() {
      const result = new Map();
      result.set("source", source).set("place", city);
      return result;
    }
  };
}

export function fetchForecast(source, city, handleFetchSuccesfullyCompleted) {
  return dispatch => {
    let place = createPlace();
    const code = "forecast";
    const handleNoData = (code, place) => {
      let message = errorDictionary[code];
      if (code !== "networkProblem" && code !== "group") message = message + place;
      dispatch(fetchWeatherFailed(message));
      return;
    };

    const readfromURL = city => {
      dispatch(getDataRequested()); //sends action that data is requested
      if (city) {
        fetch(createURLofWeatherAPI(code, city, source))
          .then(response => response.json())
          .then(data => {
            if (validate[code](data)) {
              let load = createResults[code](data, city);
              successDispatcher[code].run(dispatch, load);
              dispatch(setPlace(place));
              handleFetchSuccesfullyCompleted();
            } else {
              handleNoData(code, city);
            } //if validation failed it calls failure handler with code(which informs at which stage it happened)
          })
          .catch(err => {
            dispatch(fetchWeatherFailed(errorDictionary[err.message]));
          });
      } // if connection is not OK it calls failure handler with network problem code
    };

    readfromURL(city);

    function createPlace() {
      const result = new Map();
      result.set("source", source).set("place", city);
      return result;
    }
  };
}

export function getWeatherForComparision(handleFetchSuccesfullyCompleted) {
  return dispatch => {
    const code = "weather";
    const rawFavorites = window?.Storage?.local?.getAllPlaces();
    const favorites = rawFavorites.map(item => {
      return { label: item.label, url: createURLofWeatherAPI("weather", item.place, item.source) };
    });

    const handleNoData = (code, place) => {
      let message = errorDictionary[code];
      if (code !== "networkProblem" && code !== "group") message = message + place;
      dispatch(fetchWeatherFailed(message));
      return;
    };

    const weatherDataForComparision = { labels: [], data: [] };
    const readfromURL = table => {
      //dispatch(getDataRequested()); //sends action that data is requested
      if (table.length) {
        let singleURL = table.shift(); //checks whether passed argumets are not empty - if OK takes first element and destructurises it
        let reducedURL = [...table]; //copies remaining elements to new table
        fetch(singleURL.url)
          .then(response => response.json())
          .then(data => {
            if (/*validate['weather'](data)*/ true) {
              weatherDataForComparision.labels.push(singleURL.label);
              weatherDataForComparision.data.push(data);

              if (reducedURL.length) {
                readfromURL(reducedURL);
              } else {
                handleFetchSuccesfullyCompleted();
                successDispatcher["favorites"].run(dispatch, weatherDataForComparision);
              }

              //if there is still something in the table with arguments the function calls itself again(with reduced arguments) otherwise it dispatches redirect request to success page
            } else {
              handleNoData("weather", singleURL.label);
            } //if validation failed it calls failure handler with code(which informs at which stage it happened)
          });
      }
    };
    readfromURL(favorites);
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

export function checkSupportForCache() {
  return dispatch => {
    if (storageAvailable("localStorage")) {
      dispatch(cacheSupported());
      console.warn("Storage available");
      initGlobalStorage();
      if (window.Storage.local.hasItems()) {
        console.log("Storage contains " + window.Storage.local.getLength() + " items");
        dispatch(cacheNotEmpty());
      } else {
        console.warn("No items in storage");
      }
    } else {
      console.warn("Storage not available");
    }
  };
}

export function getWeatherSimple(source, city, handleFetchSuccesfullyCompleted) {
  return dispatch => {
    let place = createPlace();
    const code = "weather";
    const handleNoData = (code, place) => {
      let message = errorDictionary[code];
      if (code !== "networkProblem" && code !== "group") message = message + place;
      dispatch(fetchWeatherFailed(message));
      return;
    };

    const readfromURL = city => {
      dispatch(getDataRequested());
      if (city) {
        fetch(createURLofWeatherAPI(code, city, source))
          .then(response => response.json())
          .then(data => {
            if (validate[code](data)) {
              let load = createResults[code](data, city);
              successDispatcher[code].run(dispatch, load);
              dispatch(setPlace(place));
              handleFetchSuccesfullyCompleted();
            } else {
              handleNoData(code, city);
            }
          })
          .catch(err => {
            dispatch(fetchWeatherFailed(errorDictionary[err.message]));
          });
      }
    };

    readfromURL(city);

    function createPlace() {
      const result = new Map();
      result.set("source", source).set("place", city);
      return result;
    }
  };
}
