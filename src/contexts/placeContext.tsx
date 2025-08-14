import * as React from "react";
import { useLocalStorage } from "usehooks-ts";

import { PlaceType } from "types";

interface Props {
  place: PlaceType;
  setPlace: (arg: PlaceType) => void;
  clearPlace?: () => void;
}

const PlaceContext = React.createContext<Props>({} as Props);

const PlaceContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [place, setPlace] = useLocalStorage<Props["place"]>("placecontext", {} as PlaceType);

  return (
    <PlaceContext.Provider
      value={{
        place,
        setPlace,
      }}
    >
      {children}
    </PlaceContext.Provider>
  );
};

function usePlaceContext() {
  const context = React.useContext(PlaceContext);
  if (context === undefined) {
    throw new Error(" Context not found in usePlaceContext call.Check whether called within PlaceContextProvider");
  }

  return context;
}

export { PlaceContextProvider, usePlaceContext, PlaceContext };

//TODO: jednak nie wygląda najlepiej place jako pusty zwykły obiekt początkowo. Poza tym inne wartości w nim też powinny być nullowalne, np location