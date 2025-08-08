import RawRadio, { RadioProps } from "@mui/material/Radio";
import { Box } from "@mui/material";

import { radioSx, iconSx, checkedIconMergedSx } from "./Radio.styles";

const Radio = <T extends RadioProps>(props: T) => (
  <RawRadio
    sx={radioSx}
    disableRipple
    color="default"
    checkedIcon={<Box component="span" sx={checkedIconMergedSx} id="checkedIcon" />}
    icon={<Box component="span" sx={iconSx} />}
    {...props}
  />
);

export default Radio;

// TODO czy jeszcze gdzieś używany clsx
