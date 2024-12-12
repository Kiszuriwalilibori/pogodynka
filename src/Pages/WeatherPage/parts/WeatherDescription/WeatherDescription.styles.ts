import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";

import { styled } from "@mui/material/styles";

export const TextAndVoiceWeatherDescriptionPaper = styled(Paper)(({ theme }) => ({
  minHeight: "104px",
  display: "flex",
  alignItems: "center",
  marginTop: "30px",
  paddingTop: "0",
  paddingBottom: "0",
  marginBottom: theme.spacing(4),
  position: "relative",
}));

export const MuteButton = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  bottom: "10vh",
  right: "10vh",
  backgroundColor: theme.palette.warning.main,
  color: theme.palette.common.black,
  "&:hover": {
    backgroundColor: theme.palette.warning.light,
  },
}));
