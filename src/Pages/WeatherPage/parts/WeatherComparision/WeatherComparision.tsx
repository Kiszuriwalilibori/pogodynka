import { t } from "i18next";
import { Fade } from "@mui/material";
import { AxiosError } from "axios";

import ShortDescription from "../ShortDescription";
import WeatherComparisionTable from "./WeatherComparisionTable";
import Loader from "components/Loader";

import { useFetchCurrentWeather, useCreateComparisionData, useFetchComparision } from "hooks";
import { WeatherDataStack, WeatherPaper } from "styles/styled";
import { showErrorMessage } from "js/Redux/actionCreators";
import { useEffect } from "react";

const WeatherComparision = () => {
  const { favoritesWeatherDataForComparision, isComparisionLoading, isComparisionError, label } = useFetchComparision();
  const { currentError, isCurrentWeatherLoading, currentWeatherDataForComparision } = useFetchCurrentWeather();

  const weatherComparisionData = useCreateComparisionData(
    favoritesWeatherDataForComparision,
    currentWeatherDataForComparision
  );

  useEffect(() => {
    currentError && showErrorMessage((currentError as AxiosError).message);
    isComparisionError && showErrorMessage(t("favs.fetch_error")); // todo w tym momencie nie rozróżnia sytuacji pojedynczego błędu gdzie powinno dać tylko komentarz ale i wyświetlić resztę od błędu całości. W sumie powinno wywalać ciąg złożony z poszczególnych błędów
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentError, isComparisionError]);

  if (isCurrentWeatherLoading || isComparisionLoading) return <Loader />;

  if (!weatherComparisionData) return null;
  return (
    <Fade in={true} timeout={400}>
      <WeatherDataStack spacing="50px">
        <ShortDescription textContent={label} />
        <WeatherPaper variant="dark">
          <WeatherComparisionTable parameters={weatherComparisionData} />
        </WeatherPaper>
      </WeatherDataStack>
    </Fade>
  );
};

export default WeatherComparision;
