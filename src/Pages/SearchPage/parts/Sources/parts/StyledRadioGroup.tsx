import RadioGroup from "@mui/material/RadioGroup";

import useStyles from "../styles";

function StyledRadioGroup<T>(props: T) {
  const classes = useStyles();

  return <RadioGroup className={classes.formControlLabel} {...props} />;
}
export default StyledRadioGroup;
