// import { Box, Typography } from '@mui/material';
// import { useFavorites } from 'hooks';

// export const ComparisonPage = () => {
//   const { Favorites } = useFavorites();

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Weather Comparison
//       </Typography>
//       {Favorites.getLength() > 0 ? (
//         <Typography variant="body1">
//           Compare weather data for your favorite locations.
//         </Typography>
//       ) : (
//         <Typography variant="body1" color="error">
//           No favorites selected. Please add some locations to your favorites first.
//         </Typography>
//       )}
//     </Box>
//   );
// };
import { useFetchCurrentWeather, useCreateComparisionData, useFetchComparision, useDelayedCondition } from "hooks";
import { WeatherDataStack } from "styles/Common.styles";
import { showErrorMessage } from "js/Redux/actionCreators";
import { Fade, Typography } from "@mui/material";
import Loader from "components/Loader";
import TabHeader from "components/TabHeader";
import { t } from "i18next";
import { useEffect } from "react";
import ComparisionData from "../WeatherPage/parts/WeatherTabs/Comparision/ComparisionData";
import { WEATHER_DATA_STACK_SPACING } from "../WeatherPage/parts/WeatherTabs/Comparision/config";


export const ComparisonPage = () => {
  const { favoritesWeatherDataForComparision, isComparisionLoading, isComparisionError, label } = useFetchComparision();
  const { isCurrentWeatherLoading, currentWeatherDataForComparision } = useFetchCurrentWeather();
  const isLoading = useDelayedCondition(isComparisionLoading || isCurrentWeatherLoading);

const weatherComparisionData = useCreateComparisionData(
    favoritesWeatherDataForComparision,
    currentWeatherDataForComparision
  );

useEffect(() => {
    if (!favoritesWeatherDataForComparision || !currentWeatherDataForComparision) {
      showErrorMessage(t("favs.fetch_error"));
    }
  }, [favoritesWeatherDataForComparision, currentWeatherDataForComparision]);







  useEffect(() => {
    isComparisionError && showErrorMessage(t("favs.fetch_error")); // todo w tym momencie nie rozróżnia sytuacji pojedynczego błędu gdzie powinno dać tylko komentarz ale i wyświetlić resztę od błędu całości. W sumie powinno wywalać ciąg złożony z poszczególnych błędów
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComparisionError]);

  if (isLoading) return <Loader />;

  if (!weatherComparisionData) return (<
    Typography variant="body1" color="error">
      No favorites selected. Please add some locations to your favorites first.
    </Typography>);
  return (
    <Fade in={true} timeout={400}>
      <WeatherDataStack spacing={WEATHER_DATA_STACK_SPACING}>
        <TabHeader title={label} />
        <ComparisionData parameters={weatherComparisionData} />
      </WeatherDataStack>
    </Fade>
  );
};

export default ComparisonPage;
