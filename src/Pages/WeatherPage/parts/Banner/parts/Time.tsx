import moment from "moment";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const getTime = () => moment().format("D MMMM [godzina ]H:mm");

const Time = () => {
  const [time, setTime] = useState(getTime());
  const { t } = useTranslation();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const time = getTime();
      setTime(time);
    }, 60000);

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
