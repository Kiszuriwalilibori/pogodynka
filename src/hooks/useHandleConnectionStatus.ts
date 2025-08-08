import { useEffect } from "react";
import useMessage from "./useMessage";
import { useTranslation } from "react-i18next";

export const useHandleConnectionStatus = () => {
  const showMessage = useMessage();
  const { t } = useTranslation();

  useEffect(() => {
    const handleStatusChange = () => {
      navigator.onLine && showMessage.success(t("connection.restored"));
      !navigator.onLine && showMessage.error(t("connection.lost"));
    };
    window.addEventListener("online", handleStatusChange);
    window.addEventListener("offline", handleStatusChange);

    return () => {
      window.removeEventListener("offline", handleStatusChange);
      window.removeEventListener("online", handleStatusChange);
    };
  }, [showMessage, t]);
};
export default useHandleConnectionStatus;
