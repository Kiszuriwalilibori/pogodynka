import StorePlaceInFavoritesSwitch from "components/StorePlaceInFavoritesSwitch";
import { DescriptionWithIcon, WeatherPageHeader, PageContentContainer, WeatherAspectsTabs } from "./parts";

const Page = () => {
  return (
    <>
      <WeatherPageHeader />
      <PageContentContainer>
        <StorePlaceInFavoritesSwitch />
        <DescriptionWithIcon />
        <WeatherAspectsTabs />
      </PageContentContainer>
    </>
  );
};

export default Page;
