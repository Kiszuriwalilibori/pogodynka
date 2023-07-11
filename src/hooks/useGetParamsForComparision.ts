import { usePlaceContext } from "contexts/placeContext";
import useFavorites from "./useFavorites";

export const useGetParamsForComparision = () => {
  const { Favorites } = useFavorites();
  const label = usePlaceContext().place.labelComparision;
  const endpoints = Favorites.getForComparision();
  return { label, endpoints };
};
export default useGetParamsForComparision;
