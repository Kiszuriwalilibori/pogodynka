import { createColumns } from "./createColumns";
import { StyledDataGrid, WeatherPaper } from "styles/Common.styles";

interface Props {
  parameters: (string | number | object)[][];
}

const ComparisionData = (props: Props) => {
  const { parameters } = props;
  const columns = createColumns();

  return (
    <WeatherPaper variant="dark">
      <StyledDataGrid
        columns={columns}
        rows={parameters}
        getRowId={row => row.place}
        disableRowSelectionOnClick
        {...parameters}
      />
    </WeatherPaper>
  );
};

export default ComparisionData;
