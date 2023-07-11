function getValue(obj: { [key: string]: any }, key: string): any {
  let result;
  for (let property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (property === key) {
        return obj[key];
      } else if (typeof obj[property] === "object") {
        result = getValue(obj[property], key);
        if (typeof result !== "undefined") {
          return result;
        }
      }
    }
  }
}

export default getValue;
