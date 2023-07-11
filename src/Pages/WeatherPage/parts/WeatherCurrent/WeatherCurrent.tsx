import { Fade } from "@mui/material";
import { useEffect } from "react";
import { AxiosError } from "axios";

import ShortDescription from "../ShortDescription";
import Loader from "components/Loader";

import { usePlaceContext } from "contexts";
import { useDispatchAction, useFetchCurrentWeather } from "hooks";
import { Table } from "./parts";

import "./_CurrentWeather.scss";

import { WeatherDataStack, WeatherPaper } from "styles/styled";

const WeatherCurrent = () => {
  const { labelCurrent } = { ...usePlaceContext().place };
  const { showErrorMessage } = useDispatchAction();

  const { currentWeatherData, isCurrentError, currentError, isCurrentWeatherLoading /*, descriptionData*/ } =
    useFetchCurrentWeather();

  useEffect(() => {
    isCurrentError && showErrorMessage((currentError as AxiosError).message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCurrentError]); // do not add any more deps here
  if (!navigator.onLine) return null;
  if (isCurrentWeatherLoading) return <Loader />;
  if (!currentWeatherData) return null;

  return (
    <Fade in={true} timeout={400}>
      <WeatherDataStack spacing="50px">
        <ShortDescription textContent={labelCurrent} />
        <WeatherPaper variant="dark">
          <Table tableData={currentWeatherData} />
        </WeatherPaper>
      </WeatherDataStack>
    </Fade>
  );
};

export default WeatherCurrent;
