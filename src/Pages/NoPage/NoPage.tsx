import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";

import useDispatchAction from "hooks/useDispatchAction";
import "./_NoPage.scss";

const NoPage = () => {
  // const { t } = useTranslation();
  const navigate = useNavigate();
  const { showErrorMessage } = useDispatchAction();
  useEffect(() => {
    showErrorMessage(
      `Strony o adresie ${decodeURIComponent(window.location.href)} po prostu nie ma ${String.fromCodePoint(128549)} `
    );
    // showErrorMessage(t("msgs.nopage", { url: window.location.href }));
    setTimeout(() => {
      navigate(-1);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <section className="NoPage"></section>;
};

export default NoPage;
