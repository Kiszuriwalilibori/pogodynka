import FormControlLabel from "@mui/material/FormControlLabel";
import withStyles from "@mui/styles/withStyles";

import "./_Switch.scss";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const StyledFormControlLabel = withStyles({
  label: {
    fontSize: "20px",
    color: "white",
    textShadow: "-1px -1px 0 #224749, 1px -1px 0 #224749, -1px 1px 0 #224749, 1px 1px 0 #224749",
    "@media only screen and (max-width: 640px)": {
      fontSize: "calc(12px + 8 * ((100vw - 320px) / 320))",
    },
  },
})(FormControlLabel);

type Props = {
  onChangeHandler: () => void;
  labelText: string;
  isChecked: boolean;
};

/**
 *
 * @param func function which will be triggered when switch changes
 * @param labelText text which will be displayed as title
 * @param isChecked boolean indicating whether switch is checked or not
 * @returns basic switch component
 */
const SaveFavoritesButton = (props: Props): JSX.Element => {
  const { onChangeHandler, labelText } = props;

  return (
    <StyledFormControlLabel
      control={
        <Fab color="primary" aria-label="add" onClick={onChangeHandler}>
          <AddIcon />
        </Fab>
      }
      label={labelText}
      labelPlacement="top"
    />
  );
};
export default SaveFavoritesButton;
