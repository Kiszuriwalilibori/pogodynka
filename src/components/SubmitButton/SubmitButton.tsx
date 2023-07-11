import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";

import useStyles from "./style";

type Props = { text: string };

/**
 * renders styled button of submit type
 * @param text button text content
 * @returns button component
 */

const SubmitButton = (props: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Button className={classes.root} type="submit" size="small" endIcon={<SendIcon />} variant="contained">
      {props.text}
    </Button>
  );
};
export default SubmitButton;
