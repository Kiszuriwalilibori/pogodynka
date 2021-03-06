import { makeStyles } from "@material-ui/core/styles";
import {colors} from "../../js/fixtures";

const useSourceSectionClasses = makeStyles({
  area: {
    backgroundColor: colors.background_grey,
    borderRadius: "initial",
    border: "4px solid" + colors.background,
    padding: "20px",
    margin: "10px",
    marginTop: "60px",
    "@media (max-width: 548px)": { marginTop: "120px" },
    color: colors.background,
    margin: "0 1vw",
    fontWeight: "600",
    boxShadow: "0 1.3px 2.2px rgba(0, 0, 0, 0.039), 0 3.1px 5.3px rgba(0, 0, 0, 0.057), 0 5.8px 10px rgba(0, 0, 0, 0.069), 0 10.3px 17.9px rgba(0, 0, 0, 0.08), 0 19.2px 33.4px rgba(0, 0, 0, 0.097), 0 46px 80px rgba(0, 0, 0, 0.14)",
    "& .MuiFormGroup-root": {
      justifyContent: "center",
      "@media (max-width: 548px)": { flexDirection: "column" },
    },
  },

  formLabel: {
    color: "white !important",
    textShadow: "-1px -1px 0 #224749, 1px -1px 0 #224749, -1px 1px 0 #224749, 1px 1px 0 #224749",
    fontFamily: "Montserrat",
    position: "absolute",
    fontWeight: "bolder",
    fontSize: "2rem",
    top: "-50px",
    "@media (max-width: 548px)": { marginTop: "-60px" },
  },
  formControlLabel: {
    color: "black",
    "& span": { fontWeight: "700 !important", fontFamily: "Montserrat" },
  },
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
    "& span": { fontWeight: "bolder" },
  },

  icon: {
    borderRadius: "50%",
    width: 20,
    height: 20,
    boxShadow: "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: colors.background_hover,
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: colors.background,
    backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 20,
      height: 20,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: colors.background_hover,
    },
  },
});


export default useSourceSectionClasses;