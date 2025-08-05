import { GridColDef } from "@mui/x-data-grid";

import { weatherConfig, addHeaders, forecastArray, getForecastPrefix } from "models";

const COLUMN_WIDTH = 170;

export function createColumns() {
  addHeaders(weatherConfig);
  const forecastPrefix = getForecastPrefix();
  const columns: GridColDef<any>[] = [forecastPrefix];

  forecastArray.forEach(item => {
    const column = { field: item, headerName: weatherConfig[item].header };
    columns.push(column);
  });
  columns.forEach(column => {
    column.minWidth = COLUMN_WIDTH;
    column.headerAlign = "center";
  });

  return columns;
}

export default createColumns;
