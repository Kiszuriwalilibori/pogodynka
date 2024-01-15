import { styled } from "@mui/material/styles";
import { Fab } from "@mui/material";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";

export const SearchButton = styled(Fab)(({ theme }) => ({
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  alignItems: "center",
  "@media (max-width: 830px)": { position: "fixed", bottom: theme.spacing(1) },
}));

export const RestartIcon = styled(RestartAltOutlinedIcon)(({ theme }) => ({ color: theme.palette.common.black }));
