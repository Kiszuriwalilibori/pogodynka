import * as React from "react";
import { connect } from "react-redux";

import { ExtendedThunkDispatch } from "types";

import { checkSupportForGeolocation_Thunk } from "../js/Redux/checkSupportForGeolocationThunk";
import { setGeoLocationSupport } from "js/Redux/actionCreators";

type Props = {
  children: React.ReactNode;
  checkSupportForGeolocation_Thunk: () => void;
};
const CheckSupportForGeolocation = ({ checkSupportForGeolocation_Thunk, children }: Props) => {
  React.useEffect(() => {
    checkSupportForGeolocation_Thunk();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

const mapDispatchToProps = (dispatch: ExtendedThunkDispatch<ReturnType<typeof setGeoLocationSupport>>) => ({
  checkSupportForGeolocation_Thunk: () => dispatch(checkSupportForGeolocation_Thunk()),
});

export default connect(null, mapDispatchToProps)(CheckSupportForGeolocation as React.FC);
