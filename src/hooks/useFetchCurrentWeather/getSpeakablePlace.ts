import { Geolocation, PlaceVariants, Position, Translation } from "types";

export const getSpeakablePlace = (t: Translation, type: PlaceVariants, place: Position) => {
  let speakablePlace = "";

  switch (type) {
    case "city":
      speakablePlace = place as string;
      break;
    case "location":
      speakablePlace =
        t("page-weather.latitude") +
        (place as Geolocation).latitude +
        ", " +
        t("page-weather.longitude") +
        (place as Geolocation).longitude;
      break;
    default:
      speakablePlace = t("page-weather.weather_today");
  }

  return speakablePlace;
};

export default getSpeakablePlace;
