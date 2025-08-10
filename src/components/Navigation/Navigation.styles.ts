import { styled } from "@mui/material/styles";
import { Paper, Stack, Button } from "@mui/material";
import Typography from "@mui/material/Typography";

import theme from "themes/theme";
import { COLOR_BORDERS } from "themes/constans";


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
});

export const NavigationButton = styled(Button, {
  shouldForwardProp: (prop: string) => prop !== 'isActive' && prop !== 'language',
})<{ isActive?: boolean; language?: string }>(({ isActive, language, theme }) => ({
  borderRadius: 0,
  border: `3px solid ${COLOR_BORDERS}`,
  padding: `0 ${theme.spacing(1)}px`,
  textTransform: 'capitalize',
  flex: 1,
  backgroundColor: isActive ? theme.palette.greenish.light : theme.palette.greenish.main,
  color: isActive ? theme.palette.common.black : theme.palette.common.white,
  minWidth: 0,
  whiteSpace: 'normal',
  width: language === 'pl' ? '140px' : '100px',
  '&:hover': {
    backgroundColor: theme.palette.greenish.light,
  },
  '&:focus-visible': {
    outline: '2px solid ${theme.palette.primary.main}',
    outlineOffset: '2px',
  },
  '&:active': {
    backgroundColor: theme.palette.greenish.dark,
  },
  transition: 'background-color 0.2s ease',
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

export const NavigationTitle = styled(Typography)<{
  variant?: string;
  component?: string;
}>(({ variant = "h6", component = "div" }) => ({
  flexGrow: 1,
  color: theme.palette.greenish.main,
}));

export const NavigationLeftBoxItem = styled(Typography)<{
  variant?: string;
  component?: string;
}>(({ variant = "h6", component = "div" }) => ({
  flexGrow: 1,
  color: theme.palette.greenish.main,
}));
