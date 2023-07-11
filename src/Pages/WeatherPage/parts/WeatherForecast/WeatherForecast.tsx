import { useEffect } from "react";
import { Fade } from "@mui/material";
import { AxiosError } from "axios";

import Loader from "components/Loader";
import ShortDescription from "../ShortDescription";
import WeatherForecastTable from "./WeatherForecastTable";
import useDispatchAction from "hooks/useDispatchAction";

import { useFetchForecast, useProcessForecastData } from "hooks";
import { usePlaceContext } from "contexts";
import { WeatherDataStack, WeatherPaper } from "styles/styled";

const WeatherForecast = () => {
  const labelForecast = usePlaceContext().place.labelForecast;
  const { showErrorMessage } = useDispatchAction();
  const { data, isError, error, isLoading } = useFetchForecast();
  const preparedData = useProcessForecastData(data);

  useEffect(() => {
    isError && showErrorMessage((error as AxiosError).message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]); // do not add any more deps here

  if (isLoading) return <Loader />;

  if (!preparedData || !preparedData.length) return null;

  return (
    <Fade in={true} timeout={300}>
      <WeatherDataStack spacing="50px">
        <ShortDescription textContent={labelForecast} />
        <WeatherPaper variant="dark">
          <WeatherForecastTable parameters={preparedData} />
        </WeatherPaper>
      </WeatherDataStack>
    </Fade>
  );
};

export default WeatherForecast;
