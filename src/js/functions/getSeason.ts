interface MonthAndDay {
  month: number;
  day: number;
}
type Seasons = "spring" | "summer" | "fall" | "winter";
type IsSeason = (md: MonthAndDay) => boolean;

const md = (month: number, day: number): MonthAndDay => ({ month, day });
const toMd = (date: Date) => md(date.getMonth(), date.getDate());
const before = (md1: MonthAndDay, md2: MonthAndDay): boolean =>
  md1.month < md2.month || (md1.month === md2.month && md1.day <= md2.day);
const after = (md1: MonthAndDay, md2: MonthAndDay): boolean => !before(md1, md2);
const between = (mdX: MonthAndDay, mdLow: MonthAndDay, mdHigh: MonthAndDay): boolean =>
  after(mdX, mdLow) && before(mdX, mdHigh);

const seasons: { [key in Seasons]: IsSeason } = {
  spring: d => between(d, MARCH_EQUINOX, JUNE_SOLSTICE),
  summer: d => between(d, JUNE_SOLSTICE, SEPTEMBER_EQUINOX),
  fall: d => between(d, SEPTEMBER_EQUINOX, DECEMBER_SOLSTICE),
  winter: d => between(d, DECEMBER_SOLSTICE, NEW_YEAR) || between(d, NEW_YEAR, MARCH_EQUINOX),
};
/**
 * determines season in which given date is
 * @param date any date
 * @returns current season
 */
const getSeason = (date: Date) =>
  ((md = toMd(date)) => Object.keys(seasons).find(season => seasons[season as Seasons](md)))();

const MARCH_EQUINOX = md(2, 20);
const JUNE_SOLSTICE = md(5, 21);
const SEPTEMBER_EQUINOX = md(8, 23);
const DECEMBER_SOLSTICE = md(11, 21);
const NEW_YEAR = md(0, 1);

export default getSeason;
