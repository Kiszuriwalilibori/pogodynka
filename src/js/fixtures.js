export const forecastListPaths = ["temp", "feels_like", "humidity", "pressure"];

export const forecastListKelvin = [1, 2];

// table with headers for forecast table
export const forecastHeaders = ["Data i godzina", "Temperatura", "T. odczuwalna", "Wilgotność", "Ciśnienie"];
// Open Weather API ID's of some polish towns
export const citiesArray = [
  ["Kraków", "3094802"],
  ["Gdańsk", "3099434"],
  ["Poznań", "7530858"],
  ["Rzeszów", "759734"],
  ["Warszawa", "756135"],
];

export const comments = {
  temp: ["zimniej", "tak samo", "cieplej"],
  feels_like: ["zimniej", "tak samo", "cieplej"],
  temp_min: ["zimniej", "tak samo", "cieplej"],
  temp_max: ["zimniej", "tak samo", "cieplej"],
  pressure: ["niższe", "takie samo", "wyższe"],
  humidity: ["niższa", "taka sama", "wyższa"],
};

export const parameters = ["temp", "feels_like", "temp_min", "temp_max", "humidity", "pressure"];

// headers for comparative weather table
export const groupTableHeaders = ["Temperatura", "T. odczuwalna", "T. minimalna", "T. maksymalna", "Wilgotność", "Ciśnienie"];

export const weatherItems = [
  { id: "feels_like", label: "Temperatura odczuwalna", postfix: "°C" },
  { id: "humidity", label: "Wilgotność powietrza", postfix: "%" },
  { id: "pressure", label: "Ciśnienie", postfix: "hPa" },
];

export const messages = {
  weather: "Niestety nie mamy danych dla pogody w miejscowości ",
  networkProblem: "Nie udało się uzyskać połączenia z serwerem danych. Sprawdź swoje połączenie sieciowe i spróbuj za jakiś czas.",
  forecast: "Niestety nie mamy danych do dwudniowej prognozy pogody w miejscowości ",
  group: "Niestety nie mamy danych z grupy miast polskich do porównania",
};

export const APP_ACCESS_KEY = "DQqGbYve6sTIg4j9f9EPdU12FLtjyb4hiplBbNECOZA";
export const accessKey = { accessKey: APP_ACCESS_KEY };

export const urlFragments = {
  postfix: "&units=metric&appid=da16d6de03fba61dd8b294b58864d4b7&lang=pl",
  prefixForecast: "https://api.openweathermap.org/data/2.5/forecast?",
  prefixWeather: "https://api.openweathermap.org/data/2.5/weather?",
  prefixGroup: "https://api.openweathermap.org/data/2.5/group?",
  middlefix: { forecast: "q=", weather: "q=", group: "id=" },
};

export const colors = {
  background: "#416467",
  background_hover: "#5b7a7c",
  background_grey: "#B7B6B2",
};
