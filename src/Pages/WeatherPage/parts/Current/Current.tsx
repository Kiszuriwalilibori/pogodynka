import { Fade } from "@mui/material";

import { Loader, TabHeader } from "components";
import { usePlaceContext } from "contexts";
import { useDelayedCondition, useFetchCurrentWeather } from "hooks";
import { CurrentData } from "./parts";
import { WeatherDataStack } from "styles/Common.styles";
import { TIMEOUT_SHORT } from "fixtures";

import "./_CurrentWeather.scss";

const Current = () => {
  const { labelCurrent } = { ...usePlaceContext().place };
  const { currentWeatherData, isCurrentWeatherLoading } = useFetchCurrentWeather();
  const isLoading = useDelayedCondition(isCurrentWeatherLoading);

  if (!navigator.onLine) return null;
  if (isLoading) return <Loader />;
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
