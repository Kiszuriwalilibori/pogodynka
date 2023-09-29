import { Box } from "@mui/material";
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";

import { addHeaders, comparisionArray, getComparisionPrefix, Parameter, weatherConfig } from "models";

const cellRender = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => (
  <Box>
    <Box sx={{ textAlign: "center" }}>{params.row[params.field].value}</Box>
    <Box sx={{ textAlign: "center" }}>{params.row[params.field].comment}</Box>
  </Box>
);

const COLUMN_WIDTH = 170;

export function createColumns() {
  addHeaders(weatherConfig);
  const comparisionPrefix = getComparisionPrefix();
  const columns: GridColDef<any>[] = [...comparisionPrefix];
  comparisionArray.forEach(item => {
    const column = { field: item, headerName: weatherConfig[item].header };
    columns.push(column);
  });
  columns.forEach(column => {
    column.minWidth = COLUMN_WIDTH;
    column.headerAlign = "center";
    if (comparisionArray.includes(column.field as Parameter)) {
      column.renderCell = params => cellRender(params);
    }
  });

  return columns;
}

export default createColumns;
