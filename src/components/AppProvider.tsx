import { FC } from "react";
import { configureStore } from "@reduxjs/toolkit";

import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { HashRouter as Router } from "react-router-dom";
import { ThemeProvider, Theme, StyledEngineProvider } from "@mui/material";
import { register } from "../serviceWorkerRegistration";

import reducer from "../js/Redux/reducer";
import CheckSupportForLocalStorage from "./CheckSupportForLocalStorage";
import CheckSupportForGeolocation from "./CheckSupportForGeolocation";

import theme from "themes/theme";

import { PlaceContextProvider, SpeechProvider } from "contexts";

import "styles/App.css";
import "../i18n/config";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

export const store = configureStore({ reducer });

export const AppProvider: FC = ({ children }) => {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            preventDuplicate
            maxSnack={3}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <PlaceContextProvider>
              <CheckSupportForLocalStorage>
                <CheckSupportForGeolocation>
                  <SpeechProvider>
                    {/* <SetBackground> */}
                    <Router>{children}</Router>
                    {/* </SetBackground> */}
                  </SpeechProvider>
                </CheckSupportForGeolocation>
              </CheckSupportForLocalStorage>
            </PlaceContextProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
};

register();

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default AppProvider;
