import React from "react";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";

const StyledTooltip = styled(Tooltip)(({ theme }) => ({
  tooltip: {
    backgroundColor: "#FFCF10",
    boxShadow: "0 0 5px black",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 11,
  },
}));

export default React.memo(StyledTooltip);
