import axios from "axios";

export default async function getWeather(url: string) {
  const { data } = await axios.get(url);
  return data as Object | undefined;
}
