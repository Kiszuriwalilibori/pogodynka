/**
 * Function which load or sets background of landing page
 * @param backgroundURL URL of background image. If submitted, the background is made of image from URL. Otherwise no action -existing background remains
 * @returns nothing
 *
 */

import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
function updateRootStyles(backgroundURL: string) {
  const root = document.getElementById("root");
  if (root) {
    root.classList.add("fade-in");
    root.style.background = `url(${backgroundURL}) no-repeat center center fixed`;
    root.style.backgroundSize = `cover`;
  }
}
const setBackground = (handleDone: ActionCreatorWithoutPayload<"BACKGROUND_IS_READY">, backgroundURL: string): void => {
  var image = new Image();
  image.addEventListener("load", function () {
    if (backgroundURL) {
      updateRootStyles(backgroundURL);
      handleDone();
    }
  });
  image.src = backgroundURL;
};

export default setBackground;
