import clsx from "clsx";
import RawRadio from "@mui/material/Radio";

import useStyles from "../Sources.styles";

function Radio<T>(props: T) {
  const classes = useStyles();

  return (
    <RawRadio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default Radio;
