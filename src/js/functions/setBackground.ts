/**
 * Function which load or sets background of landing page
 * @param backgroundURL URL of background image. If submitted, the background is made of image from URL. Otherwise no action -existing background remains
 * @returns nothing
 *
 */

import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";

const setBackground = (handleDone: ActionCreatorWithoutPayload<"BACKGROUND_IS_READY">, backgroundURL: string): void => {
  const root = document.getElementById("root");
  var image = new Image();
  image.addEventListener("load", function () {
    if (root) {
      if (backgroundURL) {
        root.style.background = `url(${backgroundURL}) no-repeat center center fixed`;
        root.style.backgroundSize = `cover`;
        handleDone();
      }
    }
  });

  image.src = backgroundURL;

  // if (root) {
  //   if (backgroundURL) {
  //     root.style.background = `url(${backgroundURL}) no-repeat center center fixed`;
  //     root.style.backgroundSize = `cover`;
  //   }
  // }
};

export default setBackground;
