export function storageAvailable(type) {
    var storage;
    try {
      storage = window[type];
      var x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return e instanceof DOMException && (e.code === 22 || e.code === 1014 || e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED") && storage && storage.length !== 0;
    }
  }
  
  export function initGlobalStorage() {
    var Storage = function (options) {
      options = options || {};
      for (var i in options) {
        this[i] = options[i];
      }
    };
    const prefix = window.location.href;
  
    Storage.prototype = {
      storage: window.localStorage,
      addPrefix: function (key) {
        return prefix + key;
      },
  
      set: function (key, value) {
        this.storage.setItem(this.addPrefix(key), JSON.stringify(value));
      },
      get: function (key) {
        return this.storage.getItem(this.addPrefix(key));
      },
      remove: function (key) {
        const thisstotagekey = prefix + key;
        this.storage.removeItem(this.addPrefix(key));
      },
      clear: function () {
        this.storage.clear();
      },
      key: function (index) {
        return this.storage.key(index);
      },
      each: function (fn) {
        if (typeof fn === "function") {
          for (var i = 0, key; i < this.storage.length; ++i) {
            key = this.storage.key(i);
            fn(this.storage.getItem(key), key, i);
          }
        }
      },
      getAll: function () {
        let result = [];
        for (var key in this.storage) {
          if (key.includes(prefix)) {
            result.push(JSON.parse(this.storage.getItem(key)));
          }
        }
        return result;
      },
      getAllPlaces:function(){
        let result = [];
        for (var key in this.storage) {
          if (key.includes(prefix) && JSON.parse(this.storage.getItem(key))?.category ==='place') {
            result.push(JSON.parse(this.storage.getItem(key)));
          }
        }
        return result;
      },
      hasPlaces:function(){
        return this.getAllPlaces()?.length? true:false;
      },
      getLength: function () {
        return this.getAll().length;
      },
      hasItems: function () {
        return this.getAll().length ? true : false;
      },
    };
  
    window.Storage = {
      local: new Storage({ storage: window.localStorage }),
      session: new Storage({ storage: window.sessionStorage }),
    };
  }
  