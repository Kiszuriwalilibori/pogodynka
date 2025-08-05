import React from "react";
import { FC } from "react";
import { configureStore} from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { HashRouter as Router } from "react-router-dom";
import { ThemeProvider, Theme, StyledEngineProvider } from "@mui/material";
import { register } from "../serviceWorkerRegistration";
import { persistStore, persistReducer } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';

import reducer from "../js/Redux/reducer";
import CheckSupportForLocalStorage from "./CheckSupportForLocalStorage";
import CheckSupportForGeolocation from "./CheckSupportForGeolocation";

import theme from "themes/theme";

import { PlaceContextProvider, SpeechProvider } from "contexts";

import "styles/App.css";
import "../i18n/config";
import { snackbarConfig } from "../config/snackbar";

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites'], // Only persist favorites slice
};

const persistedReducer = persistReducer(persistConfig, reducer);

// Configure store with middleware and devtools
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

const AppProviderComponent: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <SnackbarProvider {...snackbarConfig} >
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

// Enhanced type exports
export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type AppPersistor = typeof persistor;
export default AppProvider;
