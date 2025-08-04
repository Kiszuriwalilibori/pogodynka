/* eslint-disable no-restricted-globals */
import Unsplash, { toJson } from "unsplash-js";
import getSeason from "js/functions/getSeason";
import WorkerMessage from "./model";

self.onmessage = function (event: MessageEvent<WorkerMessage["post"]>) {
  const { isMobile, apiKey } = event.data;
  const season = getSeason(new Date());
  let result = null;
  let error = null;
  const unsplash = new Unsplash({ accessKey: apiKey });

  unsplash.photos
    .getRandomPhoto({ query: season, orientation: "landscape" })
    .then(toJson)
    .then(json => {
      result = isMobile
        ? json.urls?.small || json.urls?.regular || json.urls?.full || json.urls?.raw
        : json.urls?.regular || json.urls?.full || json.urls?.raw || json.urls?.small;
      result && self.postMessage({ image: result });
    })
    .catch(err => {
      error = err;
      self.postMessage({ error });
    });
};
self.onerror = function (e) {
  return true;
};
