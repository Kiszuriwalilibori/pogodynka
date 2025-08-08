import CancelIcon from "@mui/icons-material/Cancel";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { t } from "i18next";
import { Fade, Box, Divider, Stack, IconButton } from "@mui/material";

import { ProblemBox, ProblemBoxContainer } from "styles/Common.styles";
import { RootStateType } from "types";
import { hideErrorMessage } from "js/Redux/actionCreators";

const dividerSx = { height: "2px !important" };
const iconButtonSx = { marginLeft: "-10px", alignSelf: "flex-start" };

const withProblemMessage = (Component: React.ComponentType<unknown>) => {
  const WithProblemMessage = (props: any) => {
    const dispatch = useDispatch();
    const isError = useSelector((state: RootStateType) => state.isError);
    const errorMessage = useSelector((state: RootStateType) => state.errorMessage);

    const handleClose = React.useCallback(() => {
      dispatch(hideErrorMessage());
    }, [dispatch]);

    return (
      <>
        {isError ? (
          <Fade in={true} timeout={400}>
            <ProblemBoxContainer>
              <ProblemBox component="article">
                <Stack spacing="8px">
                  <IconButton onClick={handleClose} sx={iconButtonSx} size="large">
                    <CancelIcon />
                  </IconButton>
                  <Divider sx={dividerSx} />
                  <Box>
                    {t("msgs.gees")}
                    <span role="img" aria-label="crying face">
                      😢
                    </span>
                  </Box>
                  <br></br>
                  <Box component="span">{errorMessage ? errorMessage : t("msgs.non_specified_error")}</Box>
                </Stack>
              </ProblemBox>
            </ProblemBoxContainer>
          </Fade>
        ) : null}
        <Component {...props} />
      </>
    );
  };

  return WithProblemMessage;
};

export default withProblemMessage;
