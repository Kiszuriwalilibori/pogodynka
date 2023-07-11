/**
 * Function which load or sets background of landing page
 * @param backgroundURL URL of background image. If submitted, the background is made of image from URL. Otherwise no action -existing background remains
 * @returns nothing
 *
 */

const setBackground = (backgroundURL?: string): void => {
  const root = document.getElementById("root");
  if (root) {
    if (backgroundURL) {
      root.style.background = `url(${backgroundURL}) no-repeat center center fixed`;
      root.style.backgroundSize = `cover`;
    }
  }
};

export default setBackground;
