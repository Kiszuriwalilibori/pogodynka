import RadioGroup from "@mui/material/RadioGroup";

import { formControlLabelSx } from "./Radio.styles";

type RadioGroupProps = React.ComponentProps<typeof RadioGroup>;

const Radios = <T extends RadioGroupProps>(props: T) => (
  <RadioGroup sx={formControlLabelSx} {...props} />
);

export default Radios;
