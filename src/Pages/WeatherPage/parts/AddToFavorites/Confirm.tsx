import FormControlLabel from "@mui/material/FormControlLabel";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { COLOR_BORDERS } from "themes/constans";

import { styled } from "@mui/material";

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  "& .MuiFormControlLabel-label": {
    fontSize: "20px",
    color: "white",
    textShadow: `-1px -1px 0 ${COLOR_BORDERS}, 1px -1px 0 ${COLOR_BORDERS}, -1px 1px 0 ${COLOR_BORDERS}, 1px 1px 0 ${COLOR_BORDERS}`,
    [theme.breakpoints.down(640)]: {
      fontSize: "calc(12px + 8 * ((100vw - 320px) / 320))",
    },
  },
}));

// const StyledFormControlLabel = withStyles({
//   label: {
//     fontSize: "20px",
//     color: "white",
//     textShadow: `-1px -1px 0 ${COLOR_BORDERS}, 1px -1px 0 ${COLOR_BORDERS}, -1px 1px 0 ${COLOR_BORDERS}, 1px 1px 0 ${COLOR_BORDERS}`,
//     "@media only screen and (max-width: 640px)": {
//       fontSize: "calc(12px + 8 * ((100vw - 320px) / 320))",
//     },
//   },
// })(FormControlLabel);

type Props = {
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
  labelText: string;
  isChecked: boolean;
};

/**
 * renders styled switch component with label
 * @param handleClick function which will be triggered when switch changes
 * @param labelText text which will be displayed as title
 * @param isChecked boolean indicating whether switch is checked or not
 * @returns basic switch component
 */

export const Confirm = (props: Props): JSX.Element => {
  const { handleClick, labelText } = props;

  return (
    <StyledFormControlLabel
      control={
        <Fab color="primary" aria-label="add" onClick={handleClick}>
          <AddIcon />
        </Fab>
      }
      label={labelText}
      labelPlacement="top"
    />
  );
};

export default Confirm;
