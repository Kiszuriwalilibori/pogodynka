import { createAction, createReducer } from "@reduxjs/toolkit";

export const showResults = createAction("RESULTS_SHOW");
export const showErrorMessage = createAction("ERROR_MESSAGE_SHOW");
export const hideErrorMessage = createAction("ERROR_MESSAGE_HIDE");
export const getDataRequested = createAction("GET_DATA_REQUESTED");
export const setGeoLocationPosition = createAction("SET_GEOLOCATION_POSITION");
export const setGeoLocationSupport = createAction("SET_GEOLOCATION_SUPPORT");
export const fetchWeatherFailed = createAction("GET_DATA_FAILED");
export const setSearchFormSourceType = createAction("SET_SEARCH_FORM_SOURCE_TYPE");
export const getCityDataReceived = createAction("GET_CITY_DATA_RECEIVED");
export const getCityForecastReceived = createAction("GET_CITY_FORECAST_RECEIVED");
export const getGroupReceived = createAction("GET_GROUP_RECEIVED");
export const getTest = createAction("GET_TEST");
export const cacheSupported = createAction("CACHE_SET_SUPPORTED");
export const cacheNotEmpty = createAction("CACHE_SET_AVAILABLE");
export const setStoreToFavorites = createAction("SET_STORE_TO_FAVORITES");
export const createCurrentLocationLabel = createAction("CURRENT_LOCATION_LABEL_CREATE");
export const setPlace = createAction("PLACE_SET");
export const clearPlace = createAction("PLACE_CLEAR");
export const toggleSnackBar = createAction("SNACKBAR_TOGGLE");
export const toggleWeatherComparisionSwitchVisibility = createAction("wEATHER_COMPARISION_SWITCH_VISIBLE");
export const toggleWeatherComparisionVisibility = createAction("WEATHER_COMPARISION_SWITCH_VISIBLE");
export const toggleForecastVisibility = createAction("WEATHER_FORECAST_SWITCH_VISIBLE");
export const getFavoritesWeatherReceived = createAction("FAVORITES_WEATHER_RECEIVED");

export const test = createAction("TEST");
const initialState = {
  isLoading: false,
  items: [],
  currentCity: "",
  currentCityData: {},
  Forecast: [],
  errorCity: "",
  errorMessage: "",
  path: "./city",
  geoLocationSupported: false,
  geoLocationPosition: null,
  searchFormSourceType: null,
  isProblemModalVisible: false,
  weatherAvailable: false,
  cacheSupported: false,
  cacheNotEmpty: false,
  storeToFavorites: false,
  currentLocationLabel: "",
  place: undefined,
  isSnackBarVisible: false,
  isWeatherComparisionVisible: false,
  isForecastVisible: false,
  favoritesWeather: [],
  snackBarItem: "",
};

const reducer = createReducer(initialState, builder => {
  builder

    .addCase(test, (state, action) => {
      state.test = action.payload;
      console.log("state.test", state.test);
    })
    .addCase(toggleWeatherComparisionVisibility, (state, action) => {
      state.isWeatherComparisionVisible = action.payload;
    })
    .addCase(toggleForecastVisibility, (state, action) => {
      state.isForecastVisible = action.payload;
    })
    .addCase(toggleSnackBar, (state, action) => {
      state.isSnackBarVisible = !state.isSnackBarVisible;
      if (action && action.payload) {
        state.snackBarItem = action.payload;
      }
    })
    .addCase(setPlace, (state, action) => {
      if (action.payload) {
        state.place = action.payload;
      }
    })
    .addCase(clearPlace, (state, action) => {
      state.place = undefined;
    })
    .addCase(createCurrentLocationLabel, (state, action) => {
      if (action.payload) {
        state.currentLocationLabel = action.payload;
      }
    })
    .addCase(showResults, (state, action) => {
      state.weatherAvailable = true;
    })
    .addCase(showErrorMessage, (state, action) => {
      if (action.payload) {
        state.errorMessage = action.payload;
        state.isError = true;
      }
    })
    .addCase(setStoreToFavorites, (state, action) => {
      if (action.payload) {
        state.storeToFavorites = action.payload;
      }
    })
    .addCase(setSearchFormSourceType, (state, action) => {
      if (action.payload) {
        state.searchFormSourceType = action.payload;
      }
    })
    .addCase(hideErrorMessage, state => {
      state.errorMessage = "";
      state.isError = false;
    })
    .addCase(cacheSupported, state => {
      state.cacheSupported = true;
    })
    .addCase(cacheNotEmpty, state => {
      state.cacheNotEmpty = true;
    })
    .addCase(getDataRequested, state => {
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
    .addCase(getFavoritesWeatherReceived, (state, action) => {
      if (action.payload) {
        state.favoritesWeather = action.payload;
      }
    })
    .addDefaultCase(() => {});
});

export default reducer;
