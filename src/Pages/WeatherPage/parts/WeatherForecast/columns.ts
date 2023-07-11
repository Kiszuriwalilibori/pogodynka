import { GridColDef } from "@mui/x-data-grid";
import { weatherConfig, forecastArray, forecastPrefix, addHeaders } from "models/Weather";

function createColumns() {
  addHeaders(weatherConfig);

  const columns: GridColDef<any>[] = [forecastPrefix];

  forecastArray.forEach(item => {
    const obj = { field: item, headerName: weatherConfig[item].header };
    columns.push(obj as any);
  });
  columns.forEach(column => {
    column.minWidth = 170;
    column.headerAlign = "center";
  });

  return columns;
}

const columns = createColumns();
export default columns;
