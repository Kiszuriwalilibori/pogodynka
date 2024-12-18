import getWeather from "js/functions/getWeather";
import { exposeWorker } from "react-hooks-worker";

const weatherWorker = (weatherURL: string) => getWeather(weatherURL);
exposeWorker(weatherWorker);
