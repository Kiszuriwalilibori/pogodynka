import SourceSection from "./parts/SourceSection";
import SearchFormFactory from "./parts/SearchFormFactory";
import "./_SearchPage.scss";

const SearchPage = () => {
  return (
    <section className="SearchPage">
      <SourceSection />
      <SearchFormFactory />
    </section>
  );
};

export default SearchPage;
