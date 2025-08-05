import { Box } from "@mui/material";
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";

import { addHeaders, comparisionArray, getComparisionPrefix, Parameter, weatherConfig } from "models";
import { COLUMN_ALIGN, COLUMN_WIDTH } from "./config";
import { boxSx } from "./createColumns.styles";

const cellRender = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => (
  <Box>
    <Box sx={boxSx}>{params.row[params.field].value}</Box>
    <Box sx={boxSx}>{params.row[params.field].comment}</Box>
  </Box>
);

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
    column.headerAlign = COLUMN_ALIGN;
    if (comparisionArray.includes(column.field as Parameter)) {
      column.renderCell = params => cellRender(params);
    }
  });

  return columns;
}

export default createColumns;
