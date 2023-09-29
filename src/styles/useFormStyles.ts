import makeStyles from "@mui/styles/makeStyles";
import { colors } from "fixtures";

export const useFormStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    border: "4px solid #224749",
    borderRadius: "42px",
    padding: "10px 20px",
    background: colors.background_grey,
    margin: "0 1vw",
    marginTop: "60px",
    boxShadow:
      "0 1px 1px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.16),0 8px 8px rgba(0,0,0,0.20);",
    "@media (max-width: 700px)": { flexDirection: "column" },
    "& .MuiOutlinedInput-root": {
      borderRadius: "initial",
    },

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      boxShadow:
        "0 1px 1px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.16),0 8px 8px rgba(0,0,0,0.20);",
    },
    "& .MuiInputBase-root": {
      color: "white !important",
      fontFamily: "Open Sans, sans-serif !important",
      backgroundColor: colors.background,
      padding: "5px 0",
      "&:hover": {
        backgroundColor: colors.background_hover,
      },
    },
    "& .MuiFormLabel-root": { color: "white !important" },
    "& .MuiOutlinedInput-notchedOutline": { border: "3px solid", borderColor: "#224749 !important" },
  },
}));
