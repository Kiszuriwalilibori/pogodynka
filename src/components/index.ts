import App from "./App";
import CheckSupportForGeolocation from "./CheckSupportForGeolocation";
import CheckSupportForLocalStorage from "./CheckSupportForLocalStorage";
import HiddenH1 from "./HiddenH1";
import Loader from "./Loader";
import NotValidated from "./NotValidated";
import SubmitButton from "./SubmitButton";
import TextField from "./TextField";
import Tooltip from "./Tooltip";
import WeatherPageHeader from "./WeatherPageHeader";

import { RootStateType, AppDispatch, AppProvider } from "./AppProvider";
import { TanstackQueryProvider } from "./TanstackQueryProvider";

export {
  App,
  AppProvider,
  CheckSupportForGeolocation,
  CheckSupportForLocalStorage,
  HiddenH1,
  Loader,
  NotValidated,
  SubmitButton,
  TanstackQueryProvider,
  TextField,
  Tooltip,
  WeatherPageHeader,
};

export type { RootStateType, AppDispatch };
