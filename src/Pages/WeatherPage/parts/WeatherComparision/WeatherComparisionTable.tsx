import columns from "./columns";
import { StyledForecastGrid } from "styles/styled";
interface Props {
  parameters: (string | number | object)[][];
}

const Table = (props: Props) => {
  const { parameters } = props;

  return (
    <StyledForecastGrid
      columns={columns}
      rows={parameters}
      getRowId={row => row.place}
      disableRowSelectionOnClick
      {...parameters}
    />
  );
};

export default Table;
