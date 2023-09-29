import Sources from "./parts/Sources";
import SearchFormFactory from "./parts/SearchFormFactory";
import "./_SearchPage.scss";
import { HiddenH1 } from "components";

const SearchPage = () => {
  return (
    <>
      <HiddenH1 headingText="Search Page" />
      <section className="SearchPage">
        <Sources />
        <SearchFormFactory />
      </section>
    </>
  );
};

export default SearchPage;
