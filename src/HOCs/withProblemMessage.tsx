import CancelIcon from "@mui/icons-material/Cancel";
import React, { Dispatch } from "react";

import { t } from "i18next";
import { connect, ConnectedProps } from "react-redux";
import { Fade, Box, Divider, Stack, IconButton } from "@mui/material";

import { ProblemBox, ProblemBoxContainer } from "styles/Common.styles";
import { RootStateType } from "types";
import { hideErrorMessage } from "js/Redux/actionCreators";

const dividerSx = { height: "2px !important" };
const iconButtonSx = { marginLeft: "-10px", alignSelf: "flex-start" };

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
