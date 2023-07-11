import Unsplash, { toJson } from "unsplash-js";
import { Dispatch } from "redux";

import { getSeason, setBackground } from "js/functions";
import { showErrorMessage } from "./actionCreators";
import { t } from "i18next";

export function fetchBackgroundImage_Thunk() {
  const season = getSeason(new Date());
  return (dispatch: Dispatch) => {
    const unsplash = new Unsplash({ accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY as string });
    unsplash.photos
      .getRandomPhoto({ query: season, orientation: "landscape" })
      .then(toJson)
      .then(json => {
        let isMobile = window.matchMedia("(max-width: 768px)").matches;
        const root = document.getElementById("root") as HTMLElement;
        root.style.backgroundSize = `cover`;
        const image = isMobile
          ? json.urls?.small || json.urls?.regular || json.urls?.full || json.urls?.raw
          : json.urls?.regular || json.urls?.full || json.urls?.raw || json.urls?.small;

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
        dispatch(showErrorMessage(t("msgs.no_background")));
      });
  };
}
