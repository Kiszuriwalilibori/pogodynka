import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none !important",
    },
  },

  inputLabel: {
    color: "black !important",
    paddingLeft: 4,
    fontWeight: 700,
    letterSpacing: "0.00938em",
  },
  dropdownStyle: {
    border: "4px solid orange",
    backgroundColor: "lightgrey",
    marginTop: -7,
    color: "black",
  },
  fieldset: { border: "none !important" },
  select: {
    backgroundColor: "transparent",
    "&:before": {
      // normal
      borderBottom: "none",
      backgroundColor: "transparent",
    },
    "&:after": {
      // focused
      borderBottom: "none",
      backgroundColor: "transparent",
    },
    "&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before": {
      // hover
      borderBottom: "none",
      backgroundColor: "transparent",
    },
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  icon: {
    fill: "green",
  },
}));

export default useStyles;

export const paperSx = { padding: "0", marginTop: "60px" };
