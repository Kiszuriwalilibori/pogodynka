import React from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";


const MyFormControlLabel = withStyles({
  label: {
    fontSize: "20px",
    color: "white",
    textShadow: "-1px -1px 0 #224749, 1px -1px 0 #224749, -1px 1px 0 #224749, 1px 1px 0 #224749",
    fontFamily: "Montserrat",
  },
})(FormControlLabel);


const Core_Switch = (props)=>{

    const {func, labelText, status } = props;
    return(

    <MyFormControlLabel
    control={
      <div className="switch__wrapper">
        <span className="option">Nie</span>
        <Switch checked={status} onChange={func} name="checked" />
        <span className="option">Tak</span>
      </div>
    }
    label={labelText}
    labelPlacement="top"
  />)

}
export default Core_Switch;