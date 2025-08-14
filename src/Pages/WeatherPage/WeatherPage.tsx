import { Container } from "./WeatherPage.styles";

import { AddToFavorites, TextAndVoiceWeatherDescription, WeatherTabs } from "./parts";

const WeatherPage = () => (
  <>
  
    <Container>
      <AddToFavorites />
      <TextAndVoiceWeatherDescription />
      <WeatherTabs />
    </Container>
  </>
);

export default WeatherPage;
