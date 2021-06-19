import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setStoreToFavorites, showErrorMessage, toggleSnackBar } from "../js/Redux/reducers/reducer";
import Label_Form from "./SearchForms/Label_Form";
import Core_Switch from './Core_Switch';


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
      
      < Core_Switch func ={toggleChecked} labelText ='Czy zapisać to miejsce do Ulubionych?' status = {check} />
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
