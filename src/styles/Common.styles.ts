import { styled } from "@mui/material/styles";
import { Box, Stack, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { COLOR_BORDERS } from "themes/constans";

export const ProblemBox = styled(Box)(({ theme }) => ({
  display: "block",
  backgroundColor: theme.palette.warning.main,
  border: `3px solid ${theme.palette.common.black}`,
  color: "black",
  margin: "0 auto",
  marginTop: "60px !important",
  padding: theme.spacing(2.5),
  fontSize: "20px",
  fontWeight: theme.typography.fontWeightMedium,
  userSelect: "none",
  maxWidth: "300px",
  boxShadow: theme.shadows[2],
  "& hr": { backgroundColor: theme.palette.common.black },
  "& p": { overflowWrap: "break-word" },
}));

export const ProblemBoxContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "10000",
}));
//todo powyższy jest pojedynczy

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  color: theme.palette.common.white,
  border: "none",
  ".MuiDataGrid-columnSeparator": {
    display: "none",
  },

  ".MuiDataGrid-columnHeaderTitle": {
    fontWeight: 600,
    fontSize: "16px",
  },
  ".MuiDataGrid-columnHeader:focus": {
    outline: "none",
  },
  ".MuiDataGrid-cell": {
    display: "flex",
    justifyContent: "center",
  },
  ".MuiDataGrid-cell:focus": {
    outline: "none",
  },
  "MuiDataGrid-footerContainer": {
    justifyContent: "center !important",
  },
  "& .MuiTablePagination-root": {
    margin: "0 auto",
    color: "white",
  },
  "& svg": { color: theme.palette.common.white },
}));

export const WeatherDataStack = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  padding: "50px 0",
  maxWidth: "1200px",
}));

export const WeatherPaper = styled(Paper)(({ theme }) => ({
  maxWidth: "95%",
}));

export const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  border: `4px solid ${COLOR_BORDERS}`,
  borderRadius: theme.spacing(6),
  padding: "10px 20px",
  background: theme.palette.grey[400],
  margin: "0 1vw",
  marginTop: "60px",
  boxShadow:
    "0 1px 1px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.16), 0 8px 8px rgba(0,0,0,0.20)",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "initial",
  },
  "& .MuiTextField-root": {
    margin: theme.spacing(1),
    width: "25ch",
    boxShadow:
      "0 1px 1px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.16), 0 8px 8px rgba(0,0,0,0.20)",
  },
  "& .MuiInputBase-root": {
    color: "white !important",
    fontFamily: "Open Sans, sans-serif !important",
    backgroundColor: theme.palette.greenish.main,
    padding: "5px 0",
    "&:hover": {
      backgroundColor: theme.palette.greenish.light,
    },
  },
  "& .MuiFormLabel-root": {
    color: `${theme.palette.common.white} !important`,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "3px solid",
    borderColor: `${COLOR_BORDERS} !important`,
  },
}));
