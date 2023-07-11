function toArray<T>(obj: { [x: string | number | symbol]: T }) {
  return Object.entries(obj)
    .sort((a, b) => {
      return +a - +b;
    })
    .map(item => item[1]);
}
export default toArray;
