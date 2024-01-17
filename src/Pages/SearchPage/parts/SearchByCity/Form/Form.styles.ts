import theme from "themes/theme";

export const microphoneSx = {
  width: "40px",
  height: "40px",
  alignSelf: "center",
  color: "white",
};

export const listeningMicrophoneSx = (listening: boolean) => {
  if (listening) {
    return {
      backgroundColor: theme.palette.sunny.dark,
      animation: "bgr 1s infinite",
      "&:hover": {
        backgroundColor: theme.palette.sunny.dark,
      },

      "@keyframes bgr": {
        "0%": {
          backgroundColor: theme.palette.sunny.dark,
        },
        "50%": {
          backgroundColor: theme.palette.sunny.light,
        },
        "100%": {
          backgroundColor: theme.palette.sunny.dark,
        },
      },
    };
  } else {
    return {
      backgroundColor: theme.palette.greenish.main,
      "&:hover": {
        backgroundColor: theme.palette.greenish.light,
      },
    };
  }
};
