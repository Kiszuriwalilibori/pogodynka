import i18next from "i18next";

import { ComparisionResult } from "types";

enum ComparisionItems {
  temp,
  feels_like,
  temp_min,
  temp_max,
  pressure,
  humidity,
}

export type ComparisionParameter = keyof typeof ComparisionItems;
export const comparisionArray: ComparisionParameter[] = [
  "temp",
  "feels_like",
  "temp_min",
  "temp_max",
  "pressure",
  "humidity",
];
// type RelationDescriptions = { [key in ComparisionParameter]: [string, string, string] };

export function getComparisionPrefix() {
  return [
    { field: "place", headerName: i18next.t("model-weather.place") },
    { field: "description", headerName: i18next.t("model-weather.description") },
  ];
}

export const getComparision = () => {
  const temperatureRelation = [
    i18next.t("model-weather.colder_adv"),
    i18next.t("model-weather.same_adv"),
    i18next.t("model-weather.warmer_adv"),
  ];
  const neutralRelation = [
    i18next.t("model-weather.lower_neutral"),
    i18next.t("model-weather.same_neutral"),
    i18next.t("model-weather.higher_neutral"),
  ];
  const feminineRelation = [
    i18next.t("model-weather.lower_feminine"),
    i18next.t("model-weather.same_feminine"),
    i18next.t("model-weather.higher_feminine"),
  ];

  return {
    fields: ["place", "description", ...comparisionArray],
    parameters: comparisionArray,
    relation: {
      temp: temperatureRelation,
      feels_like: temperatureRelation,
      temp_min: temperatureRelation,
      temp_max: temperatureRelation,
      pressure: neutralRelation,
      humidity: feminineRelation,
    },
  };
};

export type ComparisionResults = ComparisionResult[];

export default getComparision;
