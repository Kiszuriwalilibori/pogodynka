import theme from "themes/theme";
import { SxProps, Theme } from "@mui/material";

export const buttonSx: SxProps<Theme> = {
  color: theme.palette.common.white,
  backgroundColor: theme.palette.greenish.main,
  height: "50px",
  margin: "8px",
  padding: "0 16px",
  borderRadius: "initial",
  boxShadow:
    "0 1px 1px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.16),0 8px 8px rgba(0,0,0,0.20);",

  "&:hover": {
    backgroundColor: theme.palette.greenish.light,
  },
};
