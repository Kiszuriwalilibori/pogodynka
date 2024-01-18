import uuid from "react-uuid";
import { useSpeechSynthesis } from "react-speech-kit";
import { useTranslation } from "react-i18next";

import Cell from "./Cell";

import { currentArray, weatherConfig } from "models";
import { WeatherPaper } from "styles/Common.styles";
import { useEffect } from "react";

interface Props {
  weatherData: string[];
}

const CurrentData = (props: Props) => {
  const { weatherData } = props;
  const { t } = useTranslation();
  // const { speak, voices } = useSpeechSynthesis();

  // useEffect(() => {
  //   if (weatherData && weatherData.length) {
  //     const textArray = weatherData.map((item, index, ary) => {
  //       const config = weatherConfig[currentArray[index]];
  //       const desc = `${t("model-weather." + config?.name)} ${ary[index]}`;
  //       return desc;
  //     });
  //     // console.log("x", textArray.join(", "));
  //     const text = textArray.join(", ");
  //     console.log("text", text);
  //     speak({ text: text, voice: voices[2] });
  //   }
  // }, []);

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
