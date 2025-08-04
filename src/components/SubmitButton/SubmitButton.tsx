import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";

import useStyles from "./SubmitButton.style";

type Props = { text: string };

/**
 * renders styled button of submit type
 * @param text button text content
 * @returns button component
 */

const SubmitButtonComponent = (props: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Button className={classes.root} type="submit" size="small" endIcon={<SendIcon />} variant="contained">
      {props.text}
    </Button>
  );
};

export const SubmitButton = React.memo(SubmitButtonComponent);
export default SubmitButton;
