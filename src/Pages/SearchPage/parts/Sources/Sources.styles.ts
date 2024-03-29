import makeStyles from "@mui/styles/makeStyles";
import { COLOR_BORDERS } from "themes/constans";
import theme from "themes/theme";

const useStyles = makeStyles({
  sources: {
    backgroundColor: theme.palette.grey[400],
    display: "flex",
    justifyContent: "center",
    borderRadius: "initial",
    border: `${theme.spacing(0.5)} solid ${theme.palette.greenish.main}`,
    padding: theme.spacing(2.5),
    marginTop: "60px",
    "@media (max-width: 548px)": { marginTop: "11vw" },
    margin: "0 1vw",
    fontWeight: "bold",
    boxShadow:
      "0 1.3px 2.2px rgba(0, 0, 0, 0.039), 0 3.1px 5.3px rgba(0, 0, 0, 0.057), 0 5.8px 10px rgba(0, 0, 0, 0.069), 0 10.3px 17.9px rgba(0, 0, 0, 0.08), 0 19.2px 33.4px rgba(0, 0, 0, 0.097), 0 46px 80px rgba(0, 0, 0, 0.14)",
    "& .MuiFormGroup-root": {
      justifyContent: "center",
      "@media (max-width: 700px)": { flexDirection: "column" },
    },
  },

  formLabel: {
    color: "white !important",
    textShadow: `-1px -1px 0 ${COLOR_BORDERS}, 1px -1px 0 ${COLOR_BORDERS}, -1px 1px 0 ${COLOR_BORDERS}, 1px 1px 0 ${COLOR_BORDERS}`,
    position: "absolute",
    fontWeight: "bolder",
    fontSize: "2rem",
    top: "-50px",
    left: "50%",
    width: "100%",
    textAlign: "center",
    transform: "translateX(-50%)",
    "@media (max-width: 700px)": { marginTop: "-60px", top: "-80px" },
  },
  formControlLabel: {
    color: theme.palette.common.black,
    "& span": { fontWeight: "700 !important" },
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
      backgroundColor: theme.palette.greenish.light,
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: theme.palette.greenish.main,
    backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 20,
      height: 20,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: theme.palette.greenish.light,
    },
  },
});

export default useStyles;
