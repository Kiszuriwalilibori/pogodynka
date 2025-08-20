import * as React from "react";
import isEmpty from "lodash/isEmpty";

import { useDelayedCondition,useFetchCurrentWeather, useForceUpdate } from "hooks";
import { usePlaceContext} from "contexts";
import {Loader} from "components";
import Current from "./Current";



// todo usunąć w reducerze import { useSelectedTab} from "js/Redux/reducer";

export const CurrentWeather = () => {
 
  
  const forceUpdate = useForceUpdate();
  const { currentWeatherData, isCurrentWeatherLoading } = useFetchCurrentWeather();
  const isLoading = useDelayedCondition(isCurrentWeatherLoading);

  React.useEffect(() => {
    const handleStorage = () => {
      forceUpdate();
    };

    if (window) {
      window.addEventListener("storage", handleStorage);
    }

    return () => {
      if (window) {
        window.removeEventListener("storage", handleStorage);
      }
    };
  }, [forceUpdate]);

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
