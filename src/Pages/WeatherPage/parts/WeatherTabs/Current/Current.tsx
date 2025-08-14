import { Fade } from "@mui/material";

import { TabHeader } from "components";


import { WeatherDataStack } from "styles/Common.styles";
import { TIMEOUT_SHORT } from "fixtures";

import "./_CurrentWeather.scss";
import CurrentData from "./CurrentData";
import { usePlaceContext } from "contexts";

interface Props {
  currentWeatherData: string[] | undefined;
  
}

const Current = (props: Props) => {
  const { currentWeatherData} = props;
  const { labelCurrent } = { ...usePlaceContext().place };

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
