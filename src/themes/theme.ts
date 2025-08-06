import { createTheme } from "@mui/material";
import { common, grey } from "@mui/material/colors";
import { COLOR_GREENISH, COLOR_GREENISH_LIGHTER } from "./constans";


import {
  COLOR_BACKGROUND,
  COLOR_BORDERS,
  COLOR_SUNNY,
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

const theme = createTheme({
  palette: {
    sunny: { main: COLOR_SUNNY, light: COLOR_SUNNY_HOVER },
    warning: { main: COLOR_SUNNY_HOVER },
    common: { white: "#fff" },
    greenish: {
      main: COLOR_GREENISH,
      light: COLOR_GREENISH_LIGHTER,
      dark: "#2c474a"
    },
  },
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
          fontSize: "1.5rem",
          fontWeight: 600,
          gap: "0.75rem",
          padding: "1.5rem 2.125rem",
          textShadow: `-1px -1px 0 ${COLOR_BORDERS}, 1px -1px 0 ${COLOR_BORDERS}, -1px 1px 0 ${COLOR_BORDERS}, 1px 1px 0 ${COLOR_BORDERS}`,
          color: common.white,
          '@media (max-width: 548px)': { padding: "0" },
          '& > .MuiTab-iconWrapper': {
            marginBottom: 0,
          },
          '&.Mui-disabled': {
            color: grey[600],
            textShadow: "none",
          },
          '&.Mui-selected': {
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
          '& .MuiTabs-indicator': {
            height: 3,
            backgroundColor: COLOR_SUNNY,
            '@media (max-width: 548px)': { display: "none" },
          },
          '& .MuiTabs-flexContainer': {
            display: "flex",
            justifyContent: "center",
            '@media (max-width: 548px)': { flexDirection: "column", alignItems: "center" },
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: common.white,
        },
        colorPrimary: {
          '&.Mui-checked': {
            color: COLOR_BACKGROUND,
          },
        },
        track: {
          opacity: 0.6,
          backgroundColor: COLOR_BACKGROUND,
          '&.Mui-checked.Mui-checked + &': {
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
            color: common.white,
            borderStyle: "groove",
            padding: "1.25rem",
            borderRadius: "0.75rem",
            backgroundColor: COLOR_BACKGROUND,
            border: `2px solid ${common.white}`,
            boxShadow: "0 2px 4px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)",
            overflow: "auto !important",
          },
        },
      ],
    },
    MuiFab: {
      styleOverrides: {
        root: {
          backgroundColor: COLOR_SUNNY,
          color: common.black,
          '&:hover': { backgroundColor: COLOR_SUNNY_HOVER },
        },
      },
    },
  },
});

export default theme;
