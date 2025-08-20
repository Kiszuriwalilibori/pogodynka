import { Container } from "./WeatherPage.styles";

import { AddToFavorites, CurrentWeather,TextAndVoiceWeatherDescription} from "./parts";

const WeatherPage = () => (
  <>
  
    <Container>
      <AddToFavorites />
      <TextAndVoiceWeatherDescription />
      <CurrentWeather />
    </Container>
  </>
);

export default WeatherPage;
