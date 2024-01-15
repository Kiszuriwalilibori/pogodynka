import RadioGroup from "@mui/material/RadioGroup";

import useStyles from "../Sources.styles";

function Radios<T>(props: T) {
  const classes = useStyles();

  return <RadioGroup className={classes.formControlLabel} {...props} />;
}
export default Radios;
