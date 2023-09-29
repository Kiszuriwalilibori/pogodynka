import { createColumns } from "./columns";
import { StyledDataGrid, WeatherPaper } from "Pages/styled";

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
