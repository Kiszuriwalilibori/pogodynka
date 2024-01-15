import { colors } from "fixtures";
import { COLOR_SUNNY_DARK, COLOR_SUNNY_HOVER } from "themes/constans";

export const microphoneSx = {
  width: "40px",
  height: "40px",
  alignSelf: "center",
  color: "white",
};

export const listeningMicrophoneSx = (listening: boolean) => {
  if (listening) {
    return {
      backgroundColor: COLOR_SUNNY_DARK,
      animation: "bgr 1s infinite",
      "&:hover": {
        backgroundColor: COLOR_SUNNY_HOVER,
      },

      "@keyframes bgr": {
        "0%": {
          backgroundColor: COLOR_SUNNY_DARK,
        },
        "50%": {
          backgroundColor: COLOR_SUNNY_HOVER,
        },
        "100%": {
          backgroundColor: COLOR_SUNNY_DARK,
        },
      },
    };
  } else {
    return {
      backgroundColor: colors.background,
      "&:hover": {
        backgroundColor: colors.background_hover,
      },
    };
  }
};
