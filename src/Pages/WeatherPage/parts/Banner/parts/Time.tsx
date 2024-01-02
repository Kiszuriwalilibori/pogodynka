import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const INTERVAL = 60000;
const TIME_FORMAT = "D MMMM [godzina ]H:mm";

const getTime = () => moment().format(TIME_FORMAT);

const Time = () => {
  const [time, setTime] = useState(getTime());
  const { t } = useTranslation();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const time = getTime();
      setTime(time);
    }, INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="time">
      <h1>{`${t("page-weather.weather")} `}</h1>
      <span>{time}</span>
    </div>
  );
};
export default Time;
