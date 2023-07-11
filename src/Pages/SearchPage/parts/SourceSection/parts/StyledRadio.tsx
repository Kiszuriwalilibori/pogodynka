import clsx from "clsx";
import Radio from "@mui/material/Radio";

import useStyles from "../styles";

function StyledRadio<T>(props: T) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default StyledRadio;
