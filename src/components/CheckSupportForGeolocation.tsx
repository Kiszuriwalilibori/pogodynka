import React from "react";
import { useDispatch } from "react-redux";

import { ExtendedThunkDispatch, AnyAction } from "types";
import { checkSupportForGeolocation_Thunk } from "../js/Redux/checkSupportForGeolocationThunk";

type Props = {
  children: React.ReactNode;
};

const CheckSupportForGeolocation = ({ children }: Props) => {
  const dispatch = useDispatch<ExtendedThunkDispatch<AnyAction>>();
  const thunk = React.useCallback(() => {
    dispatch(checkSupportForGeolocation_Thunk());
  }, [dispatch]);

  React.useEffect(() => {
    thunk();
  }, [thunk]);

  return <>{children}</>;
};

export default React.memo(CheckSupportForGeolocation);
