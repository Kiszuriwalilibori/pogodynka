import { createTheme } from "@mui/material";
import { common, grey } from "@mui/material/colors";

import {
  COLOR_BACKGROUND,
  COLOR_BORDERS,
  COLOR_GREENISH,
  COLOR_GREENISH_LIGHTER,
  COLOR_SUNNY,
  COLOR_SUNNY_DARK,
  COLOR_SUNNY_HOVER,
} from "./constans";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    tabHeader: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    tabHeader?: React.CSSProperties;
  }
  interface Palette {
    sunny: Palette["primary"];
    greenish: Palette["primary"];
  }

  interface PaletteOptions {
    sunny?: PaletteOptions["primary"];
    greenish?: PaletteOptions["primary"];
  }
}
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    tabHeader: true;
  }
}
declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    dark: true;
  }
}

let theme = createTheme({});

theme = createTheme({
  typography: {
    fontFamily: `MontSerrat,"Roboto", "Helvetica", "Arial", sans-serif`,
    tabHeader: {
      fontSize: "32px",
      fontWeight: 600,
      textShadow: `-1px -1px 0 ${COLOR_BORDERS}, 1px -1px 0 ${COLOR_BORDERS}, -1px 1px 0 ${COLOR_BORDERS}, 1px 1px 0 ${COLOR_BORDERS}`,
      color: common.white,
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          textTransform: "capitalize",
          fontSize: theme.spacing(3),
          fontWeight: "600",
          gap: theme.spacing(1),
          padding: theme.spacing(3, 3.5),
          textShadow: `-1px -1px 0 ${COLOR_BORDERS}, 1px -1px 0 ${COLOR_BORDERS}, -1px 1px 0 ${COLOR_BORDERS}, 1px 1px 0 ${COLOR_BORDERS}`,
          color: common.white,
          "@media (max-width: 548px)": { padding: "0" },
          [`& > .MuiTab-iconWrapper`]: {
            marginBottom: 0,
          },
          "&.Mui-disabled": {
            color: grey[600],
            textShadow: "none",
          },
          "&.Mui-selected": {
            color: COLOR_SUNNY,
            textShadow: "none",
          },
        },
        iconWrapper: {
          marginBottom: 0,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: "0 !important",

          "& .MuiTabs-indicator": {
            height: 3,
            backgroundColor: COLOR_SUNNY,
            "@media (max-width: 548px)": { display: "none" },
          },
          "& .MuiTabs-flexContainer": {
            display: "flex",
            justifyContent: "center",
            "@media (max-width: 548px)": { flexDirection: "column", alignItems: "center" },
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          // Controls default (unchecked) color for the thumb
          color: theme.palette.common.white,
        },
        colorPrimary: {
          "&.Mui-checked": {
            // Controls checked color for the thumb
            color: COLOR_BACKGROUND,
          },
        },
        track: {
          // Controls default (unchecked) color for the track
          opacity: 0.6,
          backgroundColor: COLOR_BACKGROUND,
          ".Mui-checked.Mui-checked + &": {
            // Controls checked color for the track
            opacity: 0.9,
            backgroundColor: COLOR_BACKGROUND,
          },
        },
      },
    },
    MuiPaper: {
      variants: [
        {
          props: { variant: "dark" },
          style: {
            color: theme.palette.common.white,
            borderStyle: "groove",
            padding: theme.spacing(2.5),
            borderRadius: theme.spacing(1.25),
            backgroundColor: COLOR_BACKGROUND,
            border: `2px solid ${theme.palette.common.white}`,
            boxShadow: theme.shadows[2],
            overflow: "auto !important",
          },
        },
      ],
    },
    MuiFab: {
      styleOverrides: {
        root: {
          backgroundColor: COLOR_SUNNY,
          color: theme.palette.common.black,
          "&:hover": { backgroundColor: theme.palette.warning.main },
        },
      },
    },
  },
  palette: {
    sunny: { main: COLOR_SUNNY, light: COLOR_SUNNY_HOVER, dark: COLOR_SUNNY_DARK },
    greenish: { light: COLOR_GREENISH_LIGHTER, main: COLOR_GREENISH },
  },
});
export default theme;
