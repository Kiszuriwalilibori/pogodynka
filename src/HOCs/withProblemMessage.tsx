import CancelIcon from "@mui/icons-material/Cancel";
import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Fade, Box, Divider, Stack, IconButton } from "@mui/material";

import { ProblemBox, ProblemBoxContainer } from "styles/styled";
import { RootStateType } from "types";
import { hideErrorMessage } from "js/Redux/actionCreators";
import { t } from "i18next";

const mapStateToProps = (state: RootStateType) => ({
  isError: state.isError,
  errorMessage: state.errorMessage,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  hideErrorMessage: () => dispatch(hideErrorMessage()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
interface Props {
  handleClose?: () => void;
  errorMessage: string;
}
export const ProblemMessage = (props: Props) => {
  const { handleClose, errorMessage } = props;
  return (
    <Fade in={true} timeout={400}>
      <ProblemBox component="article">
        <Stack spacing="8px">
          {handleClose && (
            <IconButton onClick={handleClose} sx={{ paddingLeft: "0 !important", alignSelf: "flex-start" }}>
              <CancelIcon />
            </IconButton>
          )}
          <Divider sx={{ height: "2px !important" }} />
          <Box component="span">{t("msgs.gees")} </Box>
          <br></br>
          <Box component="span">{errorMessage ? errorMessage : "Non-specified error"}</Box>
        </Stack>
      </ProblemBox>
    </Fade>
  );
};

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
                  <IconButton onClick={handleClose} sx={{ paddingLeft: "0 !important", alignSelf: "flex-start" }}>
                    <CancelIcon />
                  </IconButton>
                  <Divider sx={{ height: "2px !important" }} />
                  <Box component="span">
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
