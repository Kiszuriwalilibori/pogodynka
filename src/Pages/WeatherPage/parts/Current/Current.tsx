import { Fade } from "@mui/material";

import { TabHeader } from "components";

import { CurrentData } from "./parts";
import { WeatherDataStack } from "styles/Common.styles";
import { TIMEOUT_SHORT } from "fixtures";

import "./_CurrentWeather.scss";

interface Props {
  currentWeatherData: string[] | undefined;
  labelCurrent: string;
}

const Current = (props: Props) => {
  const { currentWeatherData, labelCurrent } = props;
  if (!currentWeatherData) return null;

  return (
    <Fade in={true} timeout={TIMEOUT_SHORT}>
      <WeatherDataStack spacing="50px">
        <TabHeader title={labelCurrent} />
        <CurrentData weatherData={currentWeatherData} />
      </WeatherDataStack>
    </Fade>
  );
};

export default Current;
