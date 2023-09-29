import CancelIcon from "@mui/icons-material/Cancel";
import React, { Dispatch } from "react";

import { t } from "i18next";
import { connect, ConnectedProps } from "react-redux";
import { Fade, Box, Divider, Stack, IconButton } from "@mui/material";

import { ProblemBox, ProblemBoxContainer } from "styles/styled";
import { RootStateType } from "types";
import { hideErrorMessage } from "js/Redux/actionCreators";

const mapStateToProps = (state: RootStateType) => ({
  isError: state.isError,
  errorMessage: state.errorMessage,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  hideErrorMessage: () => dispatch(hideErrorMessage()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

const withProblemMessage = (Component: React.ComponentType<unknown>) => {
  return connector((props: ConnectedProps<typeof connector>) => {
    const { isError, errorMessage, hideErrorMessage, ...rest } = props;

    const handleClose = React.useCallback(() => {
      hideErrorMessage();
    }, [hideErrorMessage]);

    return (
      <>
        {isError ? (
          <Fade in={true} timeout={400}>
            <ProblemBoxContainer>
              <ProblemBox component="article">
                <Stack spacing="8px">
                  <IconButton onClick={handleClose} sx={{ marginLeft: "-10px", alignSelf: "flex-start" }}>
                    <CancelIcon />
                  </IconButton>
                  <Divider sx={{ height: "2px !important" }} />
                  <Box>
                    {t("msgs.gees")}
                    <span role="img" aria-label="crying face">
                      😢
                    </span>
                  </Box>
                  <br></br>
                  <Box component="span">{errorMessage ? errorMessage : "Non-specified error"}</Box>
                </Stack>
              </ProblemBox>
            </ProblemBoxContainer>
          </Fade>
        ) : null}
        <Component {...rest} />
      </>
    );
  });
};

export default withProblemMessage;
