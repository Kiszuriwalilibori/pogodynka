import { ProblemBox } from "styles/Common.styles";
import { useTranslation } from "react-i18next";

type Props = { message?: string };
/**
 * Renders a message that informs about validation failure
 * @param message Error message details
 * @returns Component or null
 */
const NotValidated = (props: Props): JSX.Element | null => {
  const { message } = props;
  const { t } = useTranslation();

  return (
    <ProblemBox component="article">
      <p>{t("msgs.validation_failed")}</p>
      <p>{message}</p>
    </ProblemBox>
  );
};

export default NotValidated;
