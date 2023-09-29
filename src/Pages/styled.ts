import { styled } from "@mui/material/styles";
import { Stack, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

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
