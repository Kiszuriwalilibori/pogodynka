import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const INTERVAL = 60000;
// const TIME_FORMAT = "D MMMM [godzina ]H:mm";
const TIME_FORMAT = "d MMMM H:mm";

const getTime = () => format(new Date(), TIME_FORMAT, { locale: pl });

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
