import { useEffect, useState } from "react";

import moment from "moment";
import "moment/locale/pl";

moment.locale("pl");

const getTime = () => moment().format("D MMMM [godzina ]H:mm");

const WeatherInfosTime = () => {
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const time = getTime();
      setTime(time);
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="time">
      <h1>Pogoda </h1>
      <span>{time}</span>
    </div>
  );
};
export default WeatherInfosTime;
