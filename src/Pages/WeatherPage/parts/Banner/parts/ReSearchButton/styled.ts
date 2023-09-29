import { styled } from "@mui/material/styles";
import { Fab } from "@mui/material";

export const SearchButton = styled(Fab)(({ theme }) => ({
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  alignItems: "center",
  "@media (max-width: 830px)": { position: "fixed", bottom: theme.spacing(1) },
}));
