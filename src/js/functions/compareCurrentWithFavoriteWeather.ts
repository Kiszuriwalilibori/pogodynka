import { getComparison, ComparisonParameter, ComparisonResults } from "models";

/**
 * compares weather data for current and given favorite, with rounding numerical values
 * @param {*} currentDataArray
 * @param {*} favoriteDataArray
 * @param {*} keys
 * @returns array of numbers with meaning as follows:
 * 0:current weather parameter is greater then favorite one
 * 1:current and favorite are equal
 * 2:favorite is greater then current
 */

const getRelation = (a: number, b: number) => {
  return a > b ? 0 : a === b ? 1 : 2;
};

const compareCurrentWithFavoriteWeather = (
  currentDataArray: { [key: string]: number },
  favoriteDataArray: { [key: string]: number },
  keys: ComparisonParameter[]
) => {
  let resultArray: ComparisonResults = [];

  const comparison = getComparison();

  keys.forEach((item, index) => {
    if (currentDataArray[item] && favoriteDataArray[item]) {
      const relation = getRelation(Math.round(currentDataArray[item]), Math.round(favoriteDataArray[item]));
      const verbalDescriptionOfRelation = comparison.relation[item][relation]; // array comments contains strings representing lexically relations between weather parameters(type of parameter is reflected)

      const result = { value: Math.round(favoriteDataArray[item]), comment: verbalDescriptionOfRelation }; //creates object that keeps both value of weather parameter in certain polish city and text representing relation to same parameter in target city

      resultArray.push(result);
    } else {
      resultArray.push({ value: Math.round(favoriteDataArray[item]), comment: "n/a" });
    }
  });

  return resultArray;
};

export default compareCurrentWithFavoriteWeather;
