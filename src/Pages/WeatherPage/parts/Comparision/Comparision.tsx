import { t } from "i18next";
import { Fade } from "@mui/material";

import TabTitle from "../TabTitle";
import ComparisionData from "./ComparisionData";
import Loader from "components/Loader/Loader";

import { useFetchCurrentWeather, useCreateComparisionData, useFetchComparision } from "hooks";
import { WeatherDataStack } from "Pages/styled";
import { showErrorMessage } from "js/Redux/actionCreators";
import { useEffect } from "react";

const Comparision = () => {
  const { favoritesWeatherDataForComparision, isComparisionLoading, isComparisionError, label } = useFetchComparision();
  const { isCurrentWeatherLoading, currentWeatherDataForComparision } = useFetchCurrentWeather();
  const isLoading = isComparisionLoading || isCurrentWeatherLoading;
  // const [loads, SetLoads] = useState(false)
  const weatherComparisionData = useCreateComparisionData(
    favoritesWeatherDataForComparision,
    currentWeatherDataForComparision
  );

  useEffect(() => {
    isComparisionError && showErrorMessage(t("favs.fetch_error")); // todo w tym momencie nie rozróżnia sytuacji pojedynczego błędu gdzie powinno dać tylko komentarz ale i wyświetlić resztę od błędu całości. W sumie powinno wywalać ciąg złożony z poszczególnych błędów
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComparisionError]);

  // useEffect(() => {
  //   console.log("from effect", isLoading);
  //   if (isLoading) {
  //     setTimeout(() => {
  //       if (isLoading) {
  //         console.log("loading from timeot");
  //       }
  //     }, 5000);
  //   }
  // }, [isLoading]);
  // console.log("outeffect", isLoading);

  if (isLoading) return <Loader />;

  if (!weatherComparisionData) return null;
  return (
    <Fade in={true} timeout={400}>
      <WeatherDataStack spacing="50px">
        <TabTitle title={label} />
        <ComparisionData parameters={weatherComparisionData} />
      </WeatherDataStack>
    </Fade>
  );
};

export default Comparision;
