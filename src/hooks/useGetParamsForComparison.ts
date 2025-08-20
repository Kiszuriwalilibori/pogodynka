import { usePlaceContext } from "contexts/placeContext";
import useFavorites from "./useFavorites";

export const useGetParamsForComparison = () => {
  const { Favorites } = useFavorites();
  const label = usePlaceContext().place.labelComparison;
  const endpoints = Favorites.getForComparison();
  return { label, endpoints };
};
export default useGetParamsForComparison;
