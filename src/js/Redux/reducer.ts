import { createReducer } from "@reduxjs/toolkit";

import { actionCreators } from ".";
import { Geolocation, Source } from "types";

const {
  cacheSupported,
  clearSearchFactory,
  hideErrorMessage,
  setGeoLocationSupport,
  setSearchFormSourceType,
  showErrorMessage,
  setGeoLocationPosition,
} = actionCreators;

const initialState = {
  errorMessage: "",
  geoLocationSupported: false,
  geoLocationPosition: undefined as Geolocation | undefined,
  searchFormSourceType: undefined as Omit<Source, "current"> | undefined,
  isCacheSupported: false,
  isWeatherComparisionVisible: false,
  isForecastVisible: false,
  isSearchFactoryVisible: false,
  isError: false,
};

const reducer = createReducer(initialState, builder => {
  builder

    .addCase(showErrorMessage, (state, action) => {
      if (action.payload) {
        state.errorMessage = action.payload;
        state.isError = true;
      }
    })
    .addCase(hideErrorMessage, state => {
      state.errorMessage = "";
      state.isError = false;
    })
    .addCase(setSearchFormSourceType, (state, action) => {
      if (action.payload) {
        state.searchFormSourceType = action.payload;
        state.isSearchFactoryVisible = true;
      }
    })
    .addCase(cacheSupported, (state, action) => {
      if (action.payload) {
        state.isCacheSupported = action.payload;
      }
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
    .addCase(clearSearchFactory, state => {
      state.isSearchFactoryVisible = initialState.isSearchFactoryVisible;
      state.searchFormSourceType = initialState.searchFormSourceType;
    })
    .addDefaultCase(() => {});
});

export default reducer;
