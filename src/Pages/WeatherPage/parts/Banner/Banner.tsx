import Time from "./parts/Time";
import Place from "./parts/Place";
import ReSearchButton from "./parts/ReSearchButton/ReSearchButton";
import "./_WeatherInformationsPage__Header.scss";
import { Paper } from "@mui/material";

/**
 * Renders header of page with search results
 *
 * @returns Component being header of page with search results or null
 */

const paperSx = { borderRadius: "0", padding: "none" };

const Banner = (): JSX.Element | null => {
  return (
    <Paper variant="dark" sx={paperSx}>
      <header className="WeatherInformationsPage__header" id="header">
        <Place />
        <ReSearchButton />
        <Time />
      </header>
    </Paper>
  );
};

export default Banner;
