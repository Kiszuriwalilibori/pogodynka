import { Fade, Paper } from "@mui/material";

import useFetchCurrentWeather from "hooks/useFetchCurrentWeather";

import { TIMEOUT_LONG } from "fixtures";

const WEATHER_ICON_SIZE_FACTOR: string = "@2x.png";
const WEATHER_ICON_CORE_URL: string = "http://openweathermap.org/img/wn/";
/**
 * Creates URL of given weather icon
 * @param icon represents desired icon
 * @returns complete URL to icon in API resources
 */

function createWeatherIconURL(icon: string): string {
  return WEATHER_ICON_CORE_URL + icon + WEATHER_ICON_SIZE_FACTOR;
}

const paperSx = {
  minHeight: "104px",
  display: "flex",
  alignItems: "center",
  marginTop: "30px",
  paddingTop: "0",
  paddingBottom: "0",
};

const VisualDescription = () => {
  const { descriptionData: data } = useFetchCurrentWeather();

  if (!data) return null;

  const { icon, weatherDescription } = data;
  if (!weatherDescription || !icon) return null;

  return (
    <Fade in={true} timeout={TIMEOUT_LONG}>
      <Paper variant="dark" elevation={2} sx={paperSx}>
        <img src={createWeatherIconURL(icon)} alt="weather"></img>
        {weatherDescription}
      </Paper>
    </Fade>
  );
};

export default VisualDescription;
