import WeatherInfosTime from "./parts/WeatherInfosTime";
import WeatherInfosPlace from "./parts/WeatherInfosPlace";
import ReSearchButton from "./parts/ReSearchButton";
import "./_WeatherInformationsPage__Header.scss";
import { Paper } from "@mui/material";

/**
 * Renders header of page with search results
 *
 * @returns Component being header of page with search results or null
 */

let WeatherInformationsPageHeader = (): JSX.Element | null => {
  return (
    <Paper variant="dark" sx={{ borderRadius: "0", padding: "none" }}>
      <header className="WeatherInformationsPage__header" id="header">
        <WeatherInfosPlace />
        <ReSearchButton />
        <WeatherInfosTime />
      </header>
    </Paper>
  );
};

export default WeatherInformationsPageHeader;
