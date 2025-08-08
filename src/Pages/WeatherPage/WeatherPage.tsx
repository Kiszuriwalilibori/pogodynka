import { Container } from "./WeatherPage.styles";

import { AddToFavorites, Banner, TextAndVoiceWeatherDescription, WeatherTabs } from "./parts";

const WeatherPage = () => (
  <>
    <Banner />
    <Container>
      <AddToFavorites />
      <TextAndVoiceWeatherDescription />
      <WeatherTabs />
    </Container>
  </>
);

export default WeatherPage;
