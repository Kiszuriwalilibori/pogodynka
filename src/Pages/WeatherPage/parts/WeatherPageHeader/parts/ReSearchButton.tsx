import "../_WeatherInformationsPage__Header.scss";

import { Link } from "react-router-dom";
import * as ROUTES from "../../../../../routes";
import { SearchButton } from "styles/styled";

import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
export default function ReSearchButton() {
  return (
    <SearchButton color="primary" aria-label="add">
      <Link to={ROUTES.SEARCH} style={{ textDecoration: "none", display: "flex" }}>
        <RestartAltOutlinedIcon sx={{ color: "black" }} />
      </Link>
    </SearchButton>
  );
}
