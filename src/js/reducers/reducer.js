import { createAction } from "@reduxjs/toolkit";
import * as actions from "../actions/actions";

// export const getDataRequested = createAction("GET_DATA_REQUESTED");
// export const setGeoLocationPosition =createAction('SET_GEOLOCATION_POSITION');
// export const setGeoLocationSupport = createAction('SET_GEOLOCATION_SUPPORT');
// export const fetchWeatherFailed = createAction('GET_DATA_FAILED');
// //poniższe są dublowane poniżej
// export const GET_CITY_DATA_RECEIVED = 'GET_CITY_DATA_RECEIVED';
// export const GET_CITY_FORECAST_RECEIVED ='GET_CITY_FORECAST_RECEIVED';
// export const GET_GROUP_RECEIVED = 'GET_GROUP_RECEIVED';
// export const GET_TEST ='GET_TEST';

// //odtąd zaczynają się duble pozyższych akcji
// export const getCityDataReceived = createAction('GET_CITY_DATA_RECEIVED');
// export const getCityForecastReceived = createAction('GET_CITY_FORECAST_RECEIVED');
// export const getGroupReceived = createAction('GET_GROUP_RECEIVED');
// export const getTest = createAction('GET_TEST');

const initialState = {
  isLoading: false,
  items: [],
  currentCity: "",
  currentCityData: {},
  Forecast: [],
  errorCity: "",
  errorMessage: "",
  path: "./city",
  callback: () => {},
  favoritesContainsLocation: false,
  geoLocationSupported: false,
  geoLocationPosition: null,
  searchFormSourceType: null,
  isProblemModalVisible: false,
  weatherAvailable: false,
};

// export const reducer = createReducer(initialState, builder => {
//   builder

//   .addCase(getDataRequested, (state, action) => {
//     if (action.payload) {
//       state.isLoading = true;
//     }
//   })
//   .addCase(setGeoLocationPosition, (state, action) => {
//     if (action.payload) {
//       state.geoLocationPosition = action.payload;
//     }
//   })
//   .addCase(setGeoLocationSupport, (state, action) => {
//     if (action.payload) {
//       state.geoLocationSupported = action.payload;
//     }
//   })
//   .addCase(fetchWeatherFailed, (state, action) => {
//     if (action.payload) {
//         state.isLoading = false;
//         state.errorMessage= action.payload;
//         state.isError = true;
//     }
//   })

//     .addDefaultCase(() => {});
// });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SHOW_RESULTS:
      console.log('shos.results');
      return {
        ...state,
        weatherAvailable: true,
      };

    case actions.SHOW_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
        isError: true,
      };
    case actions.HIDE_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: "",
        isError: false,
      };
    case actions.GET_DATA_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };
    case actions.SET_SEARCH_FORM_SOURCE_TYPE:
      return {
        ...state,
        searchFormSourceType: action.payload,
      };
    case actions.GET_CITY_DATA_RECEIVED:
      return {
        ...state,
        isLoading: false,
        currentCityData: action.payload.currentCityData,
        currentCity: action.payload.currentCity,
      };
    case actions.GET_CITY_FORECAST_RECEIVED:
      return {
        ...state,
        isLoading: false,
        Forecast: action.payload,
      };

    case actions.SET_GEOLOCATION_SUPPORT:
      return {
        ...state,
        geoLocationSupported: action.payload,
      };
    case actions.SET_GEOLOCATION_POSITION:
      let coords = action.payload;
      if (coords.latitude && coords.longitude) {
        return {
          ...state,
          geoLocationPosition: action.payload,
        };
      }
    case actions.GET_GROUP_RECEIVED:
      return {
        ...state,
        isLoading: false,
        Group: action.payload,
      };
    case actions.GET_CITY_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
        isError: true,
      };

    case actions.GET_TEST:
      console.log(action.payload);

    case actions.GET_DATA_FAILED:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

export default reducer;
