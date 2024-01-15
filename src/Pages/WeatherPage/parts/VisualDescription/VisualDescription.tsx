import { Fade } from "@mui/material";

import { useFetchCurrentWeather } from "hooks";
import { TIMEOUT_LONG } from "fixtures";
import { VisualDescriptionPaper } from "./VisualDescription.styles";
import { createWeatherIconURL } from "./utils";

const VisualDescription = () => {
  const { descriptionData: data } = useFetchCurrentWeather();

  if (!data) return null;

  const { icon, weatherDescription } = data;
  if (!weatherDescription || !icon) return null;

  return (
    <Fade in={true} timeout={TIMEOUT_LONG}>
      <VisualDescriptionPaper variant="dark" elevation={2}>
        <img src={createWeatherIconURL(icon)} alt="weather"></img>
        {weatherDescription}
      </VisualDescriptionPaper>
    </Fade>
  );
};

export default VisualDescription;
