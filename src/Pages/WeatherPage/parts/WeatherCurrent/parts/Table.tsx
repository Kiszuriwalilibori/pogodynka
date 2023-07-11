import { currentArray, weatherConfig } from "models/Weather";
import Cell from "./Cell";
import uuid from "react-uuid";
interface Props {
  tableData: string[];
}

const Table = (props: Props) => {
  const { tableData } = props;

  return (
    <section className="CurrentWeather__table">
      {tableData.map((item, index) => {
        const config = weatherConfig[currentArray[index]];

        return (
          <Cell
            key={uuid()}
            description={`${config?.name} ${config?.unit}`}
            cls={config?.hasPriority ? "CurrentWeather__item--large" : "CurrentWeather__item"}
            textContent={tableData[index]}
          />
        );
      })}
    </section>
  );
};

export default Table;
