import { Fade, Paper } from "@mui/material";
import { AxiosError } from "axios";

import createWeatherIconURL from "./createWeatherIconURL";
import useFetchCurrentWeather from "hooks/useFetchCurrentWeather";

import { showErrorMessage } from "js/Redux/actionCreators";
import { useEffect } from "react";

const DescriptionWithIcon = () => {
  const { isCurrentError, currentError, descriptionData: data } = useFetchCurrentWeather();
  useEffect(() => {
    isCurrentError && showErrorMessage((currentError as AxiosError).message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCurrentError]); // do not add any more deps here

  if (!data) return null;

  const { icon, weatherDescription } = data;
  if (!weatherDescription || !icon) return null;

  return (
    <Fade in={true} timeout={1000}>
      <Paper
        variant="dark"
        elevation={2}
        sx={{
          minHeight: "104px",
          display: "flex",
          alignItems: "center",
          marginTop: "30px",
          paddingTop: "0",
          paddingBottom: "0",
        }}
      >
        <img src={createWeatherIconURL(icon)} alt="weather icon"></img>
        {weatherDescription}
      </Paper>
    </Fade>
  );
};

export default DescriptionWithIcon;
