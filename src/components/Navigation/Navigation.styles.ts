import { styled, SxProps,Theme } from "@mui/material/styles";
import { Paper, Stack, Button, Box, Toolbar, ToolbarProps } from "@mui/material";
import Typography from "@mui/material/Typography";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";

import theme from "themes/theme";
import { COLOR_BORDERS } from "themes/constans";
import { ElementType } from "react";

export const NavigationPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "0",
  padding: "none",
  width: "100%",
  backgroundColor: theme.palette.grey[400],
  border: `${theme.spacing(0.5)} solid ${theme.palette.greenish.main}`,
}));

export const NavigationToolbar = styled(Stack)({
  flexDirection: "row",
  gap: 4,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: 1,
    width: "100%",
    justifyContent: "flex-start",
  },
});

export const HamburgerContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 2,
});

export const MobileMenuBox = styled(Box)({
  position: "fixed",
  top: "64px",
  [theme.breakpoints.between("sm", "md")]: {
    top: "80px",
  },
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "#00000000",
  zIndex: 1000,
  padding: "1rem",
});

export const NavigationButton = styled(Button, {
  shouldForwardProp: (prop: string) => prop !== "isActive" && prop !== "language",
})<{ isActive?: boolean; language?: string }>(({ isActive, language, theme }) => ({
  borderRadius: 0,
  border: `3px solid ${COLOR_BORDERS}`,
  padding: `0 ${theme.spacing(1)}px`,
  textTransform: "capitalize",
  flex: 1,
  backgroundColor: isActive ? theme.palette.greenish.light : theme.palette.greenish.main,
  color: isActive ? theme.palette.common.black : theme.palette.common.white,
  minWidth: 0,
  whiteSpace: "normal",
  width: language === "pl" ? "140px" : "100px",
  "&:hover": {
    backgroundColor: theme.palette.greenish.light,
  },
  "&:focus-visible": {
    outline: "2px solid ${theme.palette.primary.main}",
    outlineOffset: "2px",
  },
  "&:active": {
    backgroundColor: theme.palette.greenish.dark,
  },
  transition: "background-color 0.2s ease",
}));
export const NavigationLeftBox = styled(Stack)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "1rem",
});

export const NavigationRightBox = styled(Stack)({
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
});

export const mobileHidden:SxProps<Theme>=(theme: Theme) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
});

export const mobileVisible:SxProps<Theme>= (theme: Theme) =>  ({
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
});

export const tabletHidden:SxProps<Theme>= (theme: Theme) =>({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
});

export const tabletVisible:SxProps<Theme>= (theme: Theme) =>({
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
});

export const NavigationLeftBoxItem = styled(Typography)<{
  variant?: string;
  component?: string;
}>(({ theme, variant = "h6", component = "div" }) => ({
  flexGrow: 1,
  color: theme.palette.greenish.main,
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
  },
}));

interface LargeToolbarProps extends ToolbarProps {
  component?: ElementType; // Use React.ElementType instead of string
  role?: string; // Allow HTML role attribute
  "aria-label"?: string; // Allow ARIA attributes
}

export const LargeToolbar = styled(Toolbar, {
  shouldForwardProp: prop =>
    prop !== "disableGutters" && // Allow Toolbar-specific props
    prop !== "variant" && // Allow Toolbar-specific props
    prop !== "sx" && // Allow MUI sx prop
    !["component", "role", "aria-label"].includes(prop as string), // Allow custom props
})<LargeToolbarProps>(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.between("sm", 1468)]: {
    flexDirection: "column",
    gap: 1,
    width: "100%",
    justifyContent: "flex-start",
    paddingBottom: theme.spacing(1),
  },
}));
export const RestartIcon = styled(RestartAltOutlinedIcon)(({ theme }) => ({ color: theme.palette.common.black }));
