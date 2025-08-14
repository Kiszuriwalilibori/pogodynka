import { SxProps, Theme, MenuProps } from "@mui/material";

export const formControlSx:SxProps<Theme>= (theme: Theme) => ({
  margin: theme => theme.spacing(1),
  minWidth: 250,
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none !important",
  },
});

export const inputLabelSx:SxProps<Theme>= (theme: Theme) => ({
  color: "black !important",
  paddingLeft: 4,
  fontWeight: 700,
  letterSpacing: "0.00938em",
  transform: "translate(14px, 16px) scale(1) !important",
  "&.MuiInputLabel-shrink": {
    transform: "translate(14px, 16px) scale(1) !important",
  },
});

export const dropdownStyleSx:SxProps<Theme>= (theme: Theme) => ({
  border: "4px solid orange",
  backgroundColor: "lightgrey",
  color: "black",
});

export const selectSx:SxProps<Theme>= (theme: Theme) =>({
  backgroundColor: "transparent",
  "&:before": {
    borderBottom: "none",
    backgroundColor: "transparent",
  },
  "&:after": {
    borderBottom: "none",
    backgroundColor: "transparent",
  },
  "&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before": {
    borderBottom: "none",
    backgroundColor: "transparent",
  },
});
export const menuProps: Partial<MenuProps> = {
  PaperProps: {
    sx: dropdownStyleSx,
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
};
export const paperSx:SxProps<Theme>= (theme: Theme) =>({ padding: "0", marginTop: "60px" });
