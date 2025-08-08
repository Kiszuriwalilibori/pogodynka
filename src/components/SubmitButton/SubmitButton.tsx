import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import { buttonSx } from "./SubmitButton.style";
import { useTranslation } from "react-i18next";

type Props = { text: string };

/**
 * renders styled button of submit type
 * @param text button text content
 * @returns button component
 */

const SubmitButtonComponent = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  console.log("");
  const submitFormTitle = t('buttons.submit_form', { context: t(props.text) }) as string;
  const sendTitle = t('buttons.send') as string;
  
  return (
    <Button
      sx={buttonSx}
      type="submit"
      size="small"
      variant="contained"
      title={submitFormTitle}
      aria-label={submitFormTitle}
    >
      <SendIcon titleAccess={sendTitle} aria-label={sendTitle} />
      {props.text}
    </Button>
  );
};

export const SubmitButton = React.memo(SubmitButtonComponent);
export default SubmitButton;

//TODO: hardcoded content of title
