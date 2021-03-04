import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import clsx from "clsx";
import { connect } from "react-redux";
import { setSearchFormSourceType } from "../js/actions/actions";
import Slide from "@material-ui/core/Slide";
import useStyles from "./details/useStyles";

function StyledRadio(props) {
  const classes = useStyles();

  return <Radio className={classes.root} disableRipple color="default" checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />} icon={<span className={classes.icon} />} {...props} />;
}

function StyledRadioGroup(props) {
  const classes = useStyles();

  return <RadioGroup className={classes.formControlLabel} {...props} />;
}

const Section = props => {
  const classes = useStyles();

  const { favoritesNotEmpty, geolocationAvailable, setSearchFormSourceType } = props;

  const actionHandlers = {
    city: {
      run: () => setSearchFormSourceType("city"),
    },
    location: {
      run: () => setSearchFormSourceType("location"),
    },
    current: {
      run: () => {},
    },
  };

  const handleChange = event => {
    const type = event.target.value;
    actionHandlers[type].run();
  };

  return (
    <Slide direction="down" timeout={500} in={true} mountOnEnter unmountOnExit>
      <FormControl component="fieldset" className={classes.area}>
        <FormLabel className={classes.formLabel} component="legend">
          Pokaż pogodę dla:
        </FormLabel>
        <StyledRadioGroup row defaultValue="female" aria-label="source" name="customized-radios" onChange={handleChange}>
          <FormControlLabel value="city" control={<StyledRadio />} label="miasta" />
          <FormControlLabel value="current" disabled={!geolocationAvailable} control={<StyledRadio />} label="aktualnej lokalizacji" />
          <FormControlLabel value="location" control={<StyledRadio />} label="innej lokalizacji" />
          <FormControlLabel value="favorites" disabled={!favoritesNotEmpty} control={<StyledRadio />} label="z Ulubionych" />
        </StyledRadioGroup>
      </FormControl>
    </Slide>
  );
};

const mapStateToProps = state => ({
  favoritesNotEmpty: state.favoritesContainsLocation,
  geolocationAvailable: state.geolocationAvailable,
});

const mapDispatchToProps = dispatch => ({
  setSearchFormSourceType: x => dispatch(setSearchFormSourceType(x)),
});

const SourceSection = connect(mapStateToProps, mapDispatchToProps)(Section);
export default SourceSection;
