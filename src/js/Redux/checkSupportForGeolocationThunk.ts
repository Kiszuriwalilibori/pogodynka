import { Dispatch } from "redux";

import { setGeoLocationPosition, setGeoLocationSupport } from "./actionCreators";

interface responseType {
  coords: { latitude: number; longitude: number };
}

function getCoordsFromResponse(resp: responseType) {
  let coords = { latitude: resp.coords.latitude, longitude: resp.coords.longitude };

  return coords;
}

export function checkSupportForGeolocation_Thunk() {
  return (dispatch: Dispatch) => {
    if (navigator.geolocation) {
      dispatch(setGeoLocationSupport(true));

      navigator.geolocation.getCurrentPosition(position =>
        dispatch(setGeoLocationPosition(getCoordsFromResponse(position)))
      );
    } else {
      dispatch(setGeoLocationSupport(false));
    }
  };
}
