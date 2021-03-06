import { comments, urlFragments } from "../js/fixtures";
import { forecastListPaths, forecastListKelvin } from "../js/fixtures";
import _, { stubString } from "lodash";
// Czasami wyrzuca błąd w linii 69
// supporting function for validation, checks for very basic correctness of data (cod =200 means that data is OK in grabbed data file)
const cityExists = obj => {
  if (typeof obj == "object" && obj !== null) {
    return obj.hasOwnProperty("cod") && obj.cod == "200" ? true : false;
  } else {
    return false;
  }
};

//creates string with current data and time
export const getCurrentTime = () => {
  const today = new Date();
  const time = today.getHours() + ":" + today.getMinutes();
  return time;
};

//extracts forecast data from table being result of URL request
export const getDataFromForecast = (paths, forecast, Kelvin) => {
  let result = [];
  if (forecast.dt_txt) {
    result.push(forecast.dt_txt);
    const main = forecast.main;
    paths.forEach(item => {
      if (main[item]) {
        result.push(main[item]);
      } else {
        result.push("n/a");
      }
    });
  }
  Kelvin.forEach(item => {
    if (result[item]) {
      const temp = Math.round(result[item]);
      result[item] = temp;
    }
  });

  return result;
};

//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

// object that conatins functions creating URL for target city forecast, target city current weather and camparative group of polsih cities
// export const createURLofWeatherAPI = {
//   forecast: function (str, source) {
//     return "https://api.openweathermap.org/data/2.5/forecast?q=" + str + "&units=metric&appid=da16d6de03fba61dd8b294b58864d4b7";
//   },
//   weather: function (str, source) {
//     return "https://api.openweathermap.org/data/2.5/weather?q=" + str + "&units=metric&appid=da16d6de03fba61dd8b294b58864d4b7";
//   },
//   group: function (arr) {
//     let ids = "";
//     arr.forEach((item) => {
//       ids = ids + "," + item[1];
//     });
//     ids = ids.slice(1);
//     const result = "https://api.openweathermap.org/data/2.5/group?id=" + ids + "&units=metric&appid=da16d6de03fba61dd8b294b58864d4b7";
//     return result;
//   },
// };

// creates table with data representing comparision of weather in target city and group of polsih cities
export const compareWeather = (weatherRow, groupRow, keys) => {
  var resultArray = [];

  const getRelation = (a, b) => {
    return a > b ? 0 : a === b ? 1 : 2;
  }; //this function checks relation of two parameters

  keys.forEach(item => {
    const relation = getRelation(Math.round(weatherRow[item]), Math.round(groupRow[item]));

    const relativeRatio = comments[item][relation]; // array comments contains strings representing lexically relations between weather parameters(type of parameter is reflected)
    const result = { value: Math.round(groupRow[item]), comment: relativeRatio }; //creates object that keeps both value of weather parameter in certain polish city and text representing relation to same parameter in target city
    resultArray.push(result); //updates array of results of comparision
  });
  return resultArray;
};

//takes numeric data of weather parameter and its code and returns stringified version thereof
export const stringifyWeatherData = (data, id) => {
  switch (id) {
    case "feels_like":
      return Math.round(data).toString() + "°C";
    case "humidity":
      return data.toString() + "%";
    case "pressure":
      return Math.round(data).toString() + "hPa";
    default:
      console.log("invalid parameter received by stringifyWeatherData");
  }
};

export const createResults = {
  weather: function (data, city) {
    return { currentCity: city, currentCityData: data };
  },
  forecast: function (data) {
    return data.list.map(item => {
      return getDataFromForecast(forecastListPaths, item, forecastListKelvin);
    });
  },
  group: function (data) {
    return data.list;
  },
};

export var validate = {
  weather: function (obj) {
    return cityExists(obj) ? true : false;
  },
  forecast: function (data) {
    return cityExists(data) && _.size(data) && data.list;
  },
  group: function (obj) {
    return obj && obj.hasOwnProperty("cnt") && obj.cnt && obj.hasOwnProperty("list") ? true : false;
  },
};

export const setBackground = backgroundURL => {
  var root = document.getElementById("root");

  if (backgroundURL) {
    root.style.background = `url(${backgroundURL}) no-repeat center center fixed`;
    root.style.backgroundSize = `cover`;
  } else {
    root.classList.add("root--fallback-background");
  }
};

// export const createURLofWeatherAPI = {
//   forecast: function (str, source) {
//     return urlFragments.prefixForecast + "q=" + str + urlFragments.postfix;
//   },
//   weather: function (str, source) {
//     return urlFragments.prefixWeather + "q=" + str + urlFragments.postfix;
//   },
//   group: function (arr) {
//     let ids = "";
//     arr.forEach(item => {
//       ids = ids + "," + item[1];
//     });
//     ids = ids.slice(1);
//     const result = urlFragments.prefixGroup + "id=" + ids + urlFragments.postfix;
//     return result;
//   },
// };

export function createURLofWeatherAPI(type, item, source) {
  function createCoreURL(type, something, source) {
    switch (source) {
      case "city":
        return urlFragments.middlefix[type] + something;
        break;
      case "location":
        const location = "lat=" + something.lat + "&lon=" + something.lon;

        return location;
        break;
      default:
        return;
    }
  }

  switch (type) {
    case "forecast":
      return urlFragments.prefixForecast + createCoreURL(type, item, source) + urlFragments.postfix;
      break;

    case "weather":
      return urlFragments.prefixWeather + createCoreURL(type, item, source) + urlFragments.postfix;
      break;

    case "group":
      let ids = "";
      item.forEach(x => {
        ids = ids + "," + x[1];
      });
      ids = ids.slice(1);
      return urlFragments.prefixGroup + "id=" + ids + urlFragments.postfix;

    default:
      return urlFragments.prefixForecast + createCoreURL(type, item, source) + urlFragments.postfix;
  }
}

export const validateInput = {
  city: {
    run: item => {
      if (item.length < 2) {
        return { status: false, message: "Za krótki ciag, minimum 2 znaki" };
      }
      if (/\d|[A-z]/.test(item) === false) {
        return { status: false, message: "Dopuszczalne wyłącznie litery i cyfry" };
      }
      return { status: true, message: "" };
    },
  },

  location: {
    run: item => {
      if (!item.lon) return { status: false, message: "Nie wprowadzono długości geograficznej" };
      if (!item.lat) return { status: false, message: "Nie wprowadzono szerokości geograficznej" };
      if (isNaN(Number(item.lon))) return { status: false, message: "Długość geograficzna nie jest liczbą" };
      if (isNaN(Number(item.lat))) return { status: false, message: "Szerokość geograficzna nie jest liczbą" };
      if (Number(item.lon) < -180 || Number(item.lon) > 180) return { status: false, message: "Długość geograficzna spoza dopuszczalnego zakresu" };
      if (Number(item.lat) < -90 || Number(item.lat) > 90) return { status: false, message: "Szerokość geograficzna spoza dopuszczalnego zakresu" };
      return { status: true, message: "" };
    },
  },
};

export function getLabelfromPath(str) {
  if (str && (typeof str === "string" || str instanceof String) && str.indexOf("/") === 0) {
    str = str.substring(1);
    return str;
  } else {
    return str;
  }
}
