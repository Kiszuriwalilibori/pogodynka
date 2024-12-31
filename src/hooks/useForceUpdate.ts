import { useCallback, useState } from "react";

export const useForceUpdate = () => {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({} as React.SetStateAction<undefined>), []);
  return forceUpdate;
};
export default useForceUpdate;
