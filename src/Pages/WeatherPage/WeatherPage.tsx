import { AddToFavorites, Banner, TextAndVoiceWeatherDescription, WeatherTabs } from "./parts";
import { Container } from "./WeatherPage.styles";

const WeatherPage = () => {
  return (
    <>
      <Banner />
      <Container>
        <AddToFavorites />
        <TextAndVoiceWeatherDescription />
        <WeatherTabs />
      </Container>
    </>
  );
};

export default WeatherPage;
