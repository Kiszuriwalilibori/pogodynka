import { styled } from "@mui/material/styles";
import { Box, Button, Fab, Stack, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

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

export const LoaderContainer = styled(Button)(({ theme }) => ({
  display: "flex",
  height: "100vh",
  width: "100vw",
  position: "fixed",
  top: "0",
  left: "0",
  alignItems: "center",
  background: "transparent",
  justifyContent: "center",
}));

export const SearchButton = styled(Fab)(({ theme }) => ({
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  alignItems: "center",
  "@media (max-width: 830px)": { position: "fixed", bottom: theme.spacing(1) },
}));

export const StyledForecastGrid = styled(DataGrid)(({ theme }) => ({
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
  "& svg": { color: "white" },
}));

export const WeatherDataStack = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  padding: "50px 0",
  maxWidth: "1200px",
}));

export const WeatherPaper = styled(Paper)(({ theme }) => ({
  maxWidth: "95%",
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
