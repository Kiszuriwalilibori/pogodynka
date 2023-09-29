import Box from "@mui/material/Box";

import { ProblemBox } from "styles/styled";

type Props = { message?: string };
/**
 * renders message that informs about validation failure
 * @param message not validated fields names
 * @returns component or null
 */
const NotValidated = (props: Props): JSX.Element | null => {
  const { message } = props;

  return (
    <ProblemBox component="article">
      <Box component="span">{"Nie zwalidowano " + message}</Box>
    </ProblemBox>
  );
};

export default NotValidated;
