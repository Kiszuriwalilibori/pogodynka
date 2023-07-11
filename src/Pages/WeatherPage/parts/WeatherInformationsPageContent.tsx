import WeatherApectsTabs from "./WeatherAspectsTabs";
import { StorePlaceInFavoritesSwitch } from "components";
import { PageContentContainer } from "./PageContentContainer";
import { DescriptionWithIcon } from "./WeatherCurrent/parts";

const WeatherInformationsPageContent = () => {
  return (
    <PageContentContainer>
      <StorePlaceInFavoritesSwitch />
      <DescriptionWithIcon />
      <WeatherApectsTabs />
    </PageContentContainer>
  );
};

export default WeatherInformationsPageContent;
