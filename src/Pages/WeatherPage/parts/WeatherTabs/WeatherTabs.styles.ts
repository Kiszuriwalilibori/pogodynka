import Box from "@mui/material/Box";

import { styled } from "@mui/material/styles";

export const WeatherTabsWrapper = styled(Box)(({ theme }) => ({ width: "100%", minHeight: "101vh" }));

export const tabSX = {
  "&:focus": {
    outline: "none !important",
    border: "3px solid #ffcf10",
  },
};
