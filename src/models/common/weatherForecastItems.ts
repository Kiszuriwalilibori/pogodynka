interface WeatherForecastItems {
  [key: string]: {
    text: string;
    label: string;
  };
}

export const weatherForecastItems: WeatherForecastItems = {
  temp: { text: "temp", label: "Temperatura" },
  pressure: { text: "pressure", label: "Ciśnienie" },
  feels_like: { text: "feels_like", label: "Temperatura odczuwalna" },
  humidity: { text: "humidity", label: "Wilgotność powietrza" },
};
