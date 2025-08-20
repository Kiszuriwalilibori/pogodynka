import i18next from "i18next";

import { ComparisonResult } from "types";

enum ComparisonItems {
  temp,
  feels_like,
  temp_min,
  temp_max,
  pressure,
  humidity,
}

export type ComparisonParameter = keyof typeof ComparisonItems;
export const comparisonArray: ComparisonParameter[] = [
  "temp",
  "feels_like",
  "temp_min",
  "temp_max",
  "pressure",
  "humidity",
];
// type RelationDescriptions = { [key in ComparisionParameter]: [string, string, string] };

export function getComparisonPrefix() {
  return [
    { field: "place", headerName: i18next.t("model-weather.place") },
    { field: "description", headerName: i18next.t("model-weather.description") },
  ];
}

export const getComparison = () => {
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
    fields: ["place", "description", ...comparisonArray],
    parameters: comparisonArray,
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

export type ComparisonResults = ComparisonResult[];

export default getComparison;
