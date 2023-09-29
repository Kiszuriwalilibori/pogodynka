import { AddToFavorites, Banner, VisualDescription, WeatherTabs } from "./parts";
import { Container } from "./styled";

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
