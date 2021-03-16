import { createAction, createReducer } from "@reduxjs/toolkit";

export const showResults = createAction("SHOW_RESULTS");
export const showErrorMessage = createAction("SHOW_ERROR_MESSAGE");
export const hideErrorMessage = createAction("HIDE_ERROR_MESSAGE");
export const getDataRequested = createAction("GET_DATA_REQUESTED");
export const setGeoLocationPosition = createAction("SET_GEOLOCATION_POSITION");
export const setGeoLocationSupport = createAction("SET_GEOLOCATION_SUPPORT");
export const fetchWeatherFailed = createAction("GET_DATA_FAILED");
export const setSearchFormSourceType = createAction("SET_SEARCH_FORM_SOURCE_TYPE");
export const getCityDataReceived = createAction("GET_CITY_DATA_RECEIVED");
export const getCityForecastReceived = createAction("GET_CITY_FORECAST_RECEIVED");
export const getGroupReceived = createAction("GET_GROUP_RECEIVED");
export const getTest = createAction("GET_TEST");

const initialState = {
  isLoading: false,
  items: [],
  currentCity: "",
  currentCityData: {},
  Forecast: [],
  errorCity: "",
  errorMessage: "",
  path: "./city",
  favoritesContainsLocation: false,
  geoLocationSupported: false,
  geoLocationPosition: null,
  searchFormSourceType: null,
  isProblemModalVisible: false,
  weatherAvailable: false,
};

const reducer = createReducer(initialState, builder => {
  builder

    .addCase(showResults, (state, action) => {
      state.weatherAvailable = true;
    })
    .addCase(showErrorMessage, (state, action) => {
      if (action.payload) {
        state.errorMessage = action.payload;
        state.isError = true;
      }
    })
    .addCase(setSearchFormSourceType, (state, action) => {
      if (action.payload) {
        state.searchFormSourceType = action.payload;
      }
    })
    .addCase(hideErrorMessage, (state) => {
      state.errorMessage = "";
      state.isError = false;
    })

    .addCase(getDataRequested, (state) => {
        state.isLoading = true;
    })
    .addCase(setGeoLocationPosition, (state, action) => {
      if (action.payload) {
        state.geoLocationPosition = action.payload;
      }
    })
    .addCase(setGeoLocationSupport, (state, action) => {
      if (action.payload) {
        state.geoLocationSupported = action.payload;
      }
    })
    .addCase(fetchWeatherFailed, (state, action) => {
      if (action.payload) {
        state.isLoading = false;
        state.errorMessage = action.payload;
        state.isError = true;
      }
    })
    
    .addCase(getCityDataReceived, (state, action) => {
      if (action.payload) {
        state.isLoading = false;
        state.currentCityData = action.payload.currentCityData;
        state.currentCity = action.payload.currentCity;
      }
    })
    .addCase(getCityForecastReceived, (state, action) => {
      if (action.payload) {
        state.isLoading = false;
        state.Forecast = action.payload;
      }
    })
    .addCase(getGroupReceived, (state, action) => {
      if (action.payload) {
        state.isLoading = false;
        state.Group = action.payload;
      }
    })
    .addDefaultCase(() => {});
});

export default reducer;
