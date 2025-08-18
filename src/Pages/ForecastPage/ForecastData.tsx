import createColumns from "./columns";

import { StyledDataGrid, WeatherPaper } from "styles/Common.styles";

interface Props {
  forecastData: (string | number)[][];
}
const ForecastData = (props: Props) => {
  const { forecastData } = props;
  const columns = createColumns();

  return (
    <WeatherPaper variant="dark">
      <StyledDataGrid
        columns={columns}
        rows={forecastData}
        getRowId={row => row.date}
        disableRowSelectionOnClick
        {...forecastData}
      />
    </WeatherPaper>
  );
};
export default ForecastData;
