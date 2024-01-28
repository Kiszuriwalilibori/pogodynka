import { PlaceVariants, Translation } from "types";

export const getSpeakableIntro = (t: Translation, type: PlaceVariants) => {
  let speakableIntro = "";
  switch (type) {
    case "city":
      speakableIntro = t("page-weather.weather_today_city");
      break;
    case "location":
      speakableIntro = t("page-weather.weather_today_location");
      break;
    default:
      speakableIntro = t("page-weather.weather_today");
  }

  return speakableIntro;
};
