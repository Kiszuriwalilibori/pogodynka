import { SxProps, Theme } from "@mui/material";
import { COLOR_BORDERS } from "themes/constans";

export const formLabelSx:SxProps<Theme>= (theme: Theme) =>({
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
  });



export const sourcesSx:SxProps<Theme>= (theme: Theme) =>({  
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
  
})