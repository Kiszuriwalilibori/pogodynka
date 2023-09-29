import React from "react";
import withStyles from "@mui/styles/withStyles";
import Tooltip from "@mui/material/Tooltip";

const StyledTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: "#FFCF10",
    boxShadow: " 0 0 5px black",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 11,
  },
}))(Tooltip);

export default React.memo(StyledTooltip);
