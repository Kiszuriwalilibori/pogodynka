import { useSelector, TypedUseSelectorHook } from "react-redux";

import { RootStateType } from "types";
const useTypedSelector: TypedUseSelectorHook<RootStateType> = useSelector;
export default useTypedSelector;
