import React from "react";
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

  interface DefaultTheme extends Theme {}
}

export const store = configureStore({ reducer });

const AppProviderComponent: FC<{ children: React.ReactNode }> = ({ children }) => {
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
                    <Router>{children}</Router>
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

export const AppProvider = React.memo(AppProviderComponent);

register();

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default AppProvider;
