import uuid from "react-uuid";
import { useTranslation } from "react-i18next";

import Cell from "./Cell";

import { currentArray, weatherConfig } from "models";
import { WeatherPaper } from "styles/Common.styles";

interface Props {
  weatherData: string[] | undefined;
}

const CurrentData = (props: Props) => {
  const { weatherData } = props;
  const { t } = useTranslation();
  if(!weatherData) return null;
  return (
    <WeatherPaper variant="dark">
      <section className="CurrentWeather__table">
        {weatherData.map((item, index) => {
          const config = weatherConfig[currentArray[index]];

          return (
            <Cell
              key={uuid()}
              description={`${t("model-weather." + config?.name)} ${config?.unit}`}
              cellClassName={config?.hasPriority ? "CurrentWeather__item--large" : "CurrentWeather__item"}
              text={weatherData[index]}
            />
          );
        })}
      </section>
    </WeatherPaper>
  );
};

export default CurrentData;
