import "./_WeatherInformationsPage__Header.scss";
import { BannerPaper } from "./Banner.styles";
import { Place, ReSearchButton, Time } from "./parts";

/**
 * Renders header of page with search results
 *
 * @returns Component being header of page with search results or null
 */

const Banner = (): JSX.Element | null => {
  return (
    <BannerPaper variant="dark">
      <header className="WeatherInformationsPage__header" id="header">
        <Place />
        <ReSearchButton />
        <Time />
      </header>
    </BannerPaper>
  );
};

export default Banner;
