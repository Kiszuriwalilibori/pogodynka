import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import * as ROUTES from "routes";

import { SearchButton, RestartIcon } from "./ReSearchButton.styles";

export default function ReSearchButton() {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(ROUTES.SEARCH);
  }, [navigate]);

  return (
    <SearchButton color="primary" aria-label="add" disableFocusRipple onClick={handleClick}>
      <RestartIcon />
    </SearchButton>
  );
}
