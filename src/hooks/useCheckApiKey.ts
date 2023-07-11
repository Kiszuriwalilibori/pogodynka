import { t } from "i18next";
import { useRef } from "react";
import useMessage from "./useMessage";

export const useCheckApiKey = () => {
  const showMessage = useMessage();
  const isAPIKeyAvailable = useRef(false);

  if (!process.env.REACT_APP_WEATHER_API_KEY) {
    showMessage.error(t("msgs.no_API_key"));
  } else {
    isAPIKeyAvailable.current = true;
  }
  return isAPIKeyAvailable.current;
};

export default useCheckApiKey;
