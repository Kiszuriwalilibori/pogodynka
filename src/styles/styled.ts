import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const ProblemBox = styled(Box)(({ theme }) => ({
  display: "block",
  backgroundColor: theme.palette.warning.main,
  border: `3px solid ${theme.palette.common.black}`,
  color: "black",
  margin: "0 auto",
  marginTop: "60px !important",
  padding: theme.spacing(2.5),
  fontSize: "20px",
  fontWeight: theme.typography.fontWeightMedium,
  userSelect: "none",
  maxWidth: "300px",
  boxShadow: theme.shadows[2],
  "& hr": { backgroundColor: theme.palette.common.black },
  "& p": { overflowWrap: "break-word" },
}));

export const ProblemBoxContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "10000",
}));
