import { AddToFavorites, Banner, VisualDescription, WeatherTabs } from "./parts";
import { Container } from "./WeatherPage.styles";

const WeatherPage = () => {
  return (
    <>
      <Banner />
      <Container>
        <AddToFavorites />
        <VisualDescription />
        <WeatherTabs />
      </Container>
    </>
  );
};

export default WeatherPage;
