import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setStoreToFavorites, showErrorMessage, toggleSnackBar } from "../js/Redux/reducers/reducer";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import Label_Form from "./SearchForms/Label_Form";

const MyFormControlLabel = withStyles({
  label: {
    fontSize: "20px",
    color: "white",
    textShadow: "-1px -1px 0 #224749, 1px -1px 0 #224749, -1px 1px 0 #224749, 1px 1px 0 #224749",
    fontFamily: "Montserrat",
  },
})(FormControlLabel);

function MySwitch(props) {
  const { cacheSupported, place, currentLocationLabel, showErrorMessage, toggleSnackBar } = props;
  
  
  let [check, setCheck] = useState(false);
  let [favoritesStored, setFavoritesStored] = useState(false);
  let label;
  const source = place?.get("source");
  const toggleChecked = () => {
    setCheck(prev => !prev);
  };


  useEffect(() => {
    if (check) label = source === "city" ? place.get("place") : source === "location" ? currentLocationLabel : "";
    if (check && label) {
      try {
        const record = { category: "place", label: label, source: source, place: place.get("place") };
        console.log('source', source);
        console.log('label', label);
        if (!window.Storage.local.get(label)) {
          window.Storage.local.set(label, record);
          toggleSnackBar('Pomyślnie dodano '+ label + ' do ulubionych');
          setFavoritesStored(true);
        } else {
          source === "location" && showErrorMessage("Etykieta już użyta. Wypróbuj inny tekst.");
        }
      } catch (error) {
        showErrorMessage(error);
      }
    }
  }, [check, currentLocationLabel]);
  
  return cacheSupported && !favoritesStored  && place? (
    <>
      <MyFormControlLabel
        control={
          <div className="switch__wrapper">
            <span className="option">Nie</span>
            <Switch checked={check} onChange={toggleChecked} name="checked" />
            <span className="option">Tak</span>
          </div>
        }
        label="Czy zapisać to miejsce do Ulubionych?"
        labelPlacement="top"
      />
      {check && source && source != "city" ? <Label_Form /> : null}
    </>
  ) : null;
}

const mapStateToProps = state => ({
  cacheSupported: state.cacheSupported,
  place: state.place,
  currentLocationLabel: state.currentLocationLabel,
});

const mapDispatchToProps = dispatch => ({
  setStoreToFavorites: data => dispatch(setStoreToFavorites(data)),
  showErrorMessage: data => dispatch(showErrorMessage(data)),
  toggleSnackBar: data => dispatch(toggleSnackBar(data)),
});

const StorePlaceInFavorites_Switch = connect(mapStateToProps, mapDispatchToProps)(MySwitch);
export default StorePlaceInFavorites_Switch;
