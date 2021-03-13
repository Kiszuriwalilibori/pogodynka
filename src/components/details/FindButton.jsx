import React from "react";
import SendIcon from "@material-ui/icons/Send";
import { MyButton, } from "./details";

const FindButton = props => (
    <MyButton size="small" onClick={props.fn} endIcon={<SendIcon />} variant="contained">
      Wyszukaj
    </MyButton>
  );
export default FindButton;