import * as React from "react";

import { connect } from "react-redux";

import { AnyAction, ThunkAction, ExtendedThunkDispatch, RootStateType } from "types";
import { checkSupportForGeolocation_Thunk } from "../js/Redux/checkSupportForGeolocationThunk";
import { setGeoLocationSupport } from "js/Redux/actionCreators";

type Props = {
  children: React.ReactNode;
  thunk: () => ThunkAction<void, RootStateType, unknown, AnyAction>;
};
const CheckSupportForGeolocation = ({ thunk, children }: Readonly<Props>) => {
  React.useEffect(() => {
    thunk();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

const mapDispatchToProps = (dispatch: ExtendedThunkDispatch<ReturnType<typeof setGeoLocationSupport>>) => ({
  thunk: () => dispatch(checkSupportForGeolocation_Thunk()),
});

export default connect(null, mapDispatchToProps)(CheckSupportForGeolocation as React.FC);
