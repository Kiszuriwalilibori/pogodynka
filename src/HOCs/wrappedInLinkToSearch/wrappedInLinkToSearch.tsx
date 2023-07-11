import { Link } from "react-router-dom";
import "./_wrappedInLinkToSearch.scss";

import * as ROUTES from "../../routes";

function wrappedInLinkToSearch<T>(Component: React.ComponentType<React.PropsWithChildren<T>>) {
  return (props: React.PropsWithChildren<T>) => (
    <Link to={ROUTES.SEARCH} className="linkToSearch">
      <Component {...props} />
    </Link>
  );
}

export default wrappedInLinkToSearch;
