import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import * as ROUTES from "routes";

import { SearchButton } from "./styled";

export default function ReSearchButton() {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(ROUTES.SEARCH);
  }, [navigate]);

  return (
    <SearchButton color="primary" aria-label="add" disableFocusRipple onClick={handleClick}>
      <RestartAltOutlinedIcon sx={{ color: "black" }} />
    </SearchButton>
  );
}
