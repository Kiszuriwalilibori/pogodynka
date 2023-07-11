import { StyledForecastGrid } from "styles/styled";
import columns from "./columns";

interface Props {
  parameters: (string | number)[][];
}
const WeatherForecastTable = (props: Props) => {
  const { parameters } = props;

  return (
    <StyledForecastGrid
      columns={columns}
      rows={parameters}
      getRowId={row => row.date}
      disableRowSelectionOnClick
      {...parameters}
    />
  );
};
export default WeatherForecastTable;
