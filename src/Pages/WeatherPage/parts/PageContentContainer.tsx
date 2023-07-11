import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const PageContentContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
  paddingTop: theme.spacing(3.5),
  maxWidth: 1200,
  width: "100%",
  margin: "0 auto",
  "@media only screen and (max-width: 830px)": {
    paddingBottom: theme.spacing(2),
  },
}));
export default PageContentContainer;
