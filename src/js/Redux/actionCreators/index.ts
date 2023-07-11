import { createAction } from "@reduxjs/toolkit";
import { PermittedPlaceVariants, Geolocation } from "types";

export const cacheSupported = createAction<boolean>("CACHE_SET_SUPPORTED");
export const clearSearchFactory = createAction<void>("SEARCH_FACTORY_CLEAR");
export const setSearchFormSourceType = createAction<PermittedPlaceVariants>("SET_SEARCH_FORM_SOURCE_TYPE");
export const setGeoLocationSupport = createAction<boolean>("SET_GEOLOCATION_SUPPORT");
export const hideErrorMessage = createAction("ERROR_MESSAGE_HIDE");
export const showErrorMessage = createAction<string>("ERROR_MESSAGE_SHOW");

export const setGeoLocationPosition = createAction<Geolocation | undefined>("SET_GEOLOCATION_POSITION");
