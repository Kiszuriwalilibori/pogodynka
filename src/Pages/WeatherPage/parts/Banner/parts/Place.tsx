import { usePlaceContext } from "contexts";
import { PlaceVariants } from "types";

/**
 * Renders name or coordinates
 * @returns component that renders place
 */
const Place = () => {
  const { label, type } = usePlaceContext().place;
  if (!label) return null;

  const className = type === PlaceVariants.LOCATION ? "locationName" : "cityName";

  return <div className={className}>{label}</div>;
};
export default Place;
