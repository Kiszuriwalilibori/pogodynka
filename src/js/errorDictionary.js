

let errorDictionary = {
    'NetworkError when attempting to fetch resource.': 'Podczas próby pobrania zawartości zewnętrznej wystapił błąd',
    'Bye': 'Adiós'
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
  
  