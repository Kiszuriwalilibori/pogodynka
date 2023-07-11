import { Box } from "@mui/material";
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import { addHeaders, comparisionArray, comparisionPrefix, weatherConfig } from "models/Weather";

const cellRender = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => (
  <Box>
    <Box sx={{ textAlign: "center" }}>{params.row[params.field].value}</Box>
    <Box sx={{ textAlign: "center" }}>{params.row[params.field].comment}</Box>
  </Box>
);

function createColumns() {
  addHeaders(weatherConfig);
  const columns: GridColDef<any>[] = [...comparisionPrefix];
  comparisionArray.forEach(item => {
    const obj = { field: item, headerName: weatherConfig[item].header };
    columns.push(obj as any);
  });
  columns.forEach(column => {
    column.minWidth = 170;
    column.headerAlign = "center";
    if (comparisionArray.includes(column.field as any)) {
      column.renderCell = params => cellRender(params);
    }
  });

  return columns;
}

const columns = createColumns();

export default columns;
