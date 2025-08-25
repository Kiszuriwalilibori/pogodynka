import isEmpty from "lodash/isEmpty";

import { useDelayedCondition,useFetchCurrentWeather } from "hooks";
import { usePlaceContext} from "contexts";
import {Loader} from "components";
import Current from "./Current";


export const CurrentWeather = () => {
 
  const { currentWeatherData, isCurrentWeatherLoading } = useFetchCurrentWeather();
  const isLoading = useDelayedCondition(isCurrentWeatherLoading);
  const placeContext = usePlaceContext();

  if (isEmpty(placeContext.place)) return null;
  if (isLoading) {
    return <Loader />;
  }
  if (!currentWeatherData) return null;

  return (
    <>
        <Current currentWeatherData={currentWeatherData} />
    </>
  );
};

export default CurrentWeather;
