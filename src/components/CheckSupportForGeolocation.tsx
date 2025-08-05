import React from "react";

import { connect } from "react-redux";

import { ExtendedThunkDispatch} from "types";
import { checkSupportForGeolocation_Thunk } from "../js/Redux/checkSupportForGeolocationThunk";
import { setGeoLocationSupport } from "js/Redux/actionCreators";

type Props = {
  children: React.ReactNode;
  thunk: () => void;
};

const CheckSupportForGeolocationComponent = ({ thunk, children }: Readonly<Props>): React.ReactElement | null => {
  React.useEffect(() => {
    thunk();

  }, []);

  return <>{children}</>;
};

const mapDispatchToProps = (dispatch: ExtendedThunkDispatch<ReturnType<typeof setGeoLocationSupport>>) => ({
  thunk: () => {
    dispatch(checkSupportForGeolocation_Thunk());
  },
});

const CheckSupportForGeolocationMemo = React.memo(CheckSupportForGeolocationComponent);
export const CheckSupportForGeolocation = connect(null, mapDispatchToProps)(CheckSupportForGeolocationMemo);
export default CheckSupportForGeolocation;
