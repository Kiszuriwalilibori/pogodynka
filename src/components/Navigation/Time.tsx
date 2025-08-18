import { useTranslation } from "react-i18next";
import { format, Locale } from "date-fns";
import { enUS, pl } from "date-fns/locale";
import { useEffect, useState } from "react";
import { ReactElement } from "react";

const INTERVAL = 60000;
const TIME_FORMAT = "d MMMM H:mm";

// Map i18next language codes to date-fns locales
const localeMap: { [key: string]: Locale } = {
  pl: pl,
  en: enUS,
};

interface Props {
    renderer: (text: string) => ReactElement;
}
const getTime = (lang: string) =>
  format(new Date(), TIME_FORMAT, { locale: localeMap[lang] || enUS });

export const Time = (props:Props) => {
  const { renderer } = props;
  const { i18n } = useTranslation();
  const [time, setTime] = useState(getTime(i18n.language));

  useEffect(() => {
    // Update time immediately when language changes
    setTime(getTime(i18n.language));

    const intervalId = setInterval(() => {
      setTime(getTime(i18n.language));
    }, INTERVAL);

    return () => clearInterval(intervalId);
  }, [i18n.language]);
 if (!time) return null;
  return renderer(time);
};

export default Time;
