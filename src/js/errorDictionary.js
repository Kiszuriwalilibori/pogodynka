

let errorDictionary = {
    'NetworkError when attempting to fetch resource.': 'Podczas próby pobrania zawartości zewnętrznej wystapił błąd',
    'weather': 'Niestety nie mamy danych dla pogody w miejscowości ',
    'forecast': 'Niestety nie mamy danych do dwudniowej prognozy pogody w miejscowości ',
    'group': 'Niestety nie mamy danych z grupy miast polskich do porównania',
  };
  
  errorDictionary = new Proxy(errorDictionary, {
    get(target, phrase) {
      if (phrase in target) {
        return target[phrase];
      } else {
        return phrase;
      }
    }
  });
  
  export default errorDictionary;
  
  