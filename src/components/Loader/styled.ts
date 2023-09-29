import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const LoaderContainer = styled(Button)(({ theme }) => ({
  display: "flex",
  height: "100vh",
  width: "100vw",
  position: "fixed",
  top: "0",
  left: "0",
  alignItems: "center",
  background: "transparent",
  justifyContent: "center",
}));
