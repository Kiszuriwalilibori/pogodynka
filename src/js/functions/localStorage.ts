import createURL from "./createURL";
import i18next from "i18next";
import { Favorite } from "types";

type FilteringFunction = (item: any) => boolean;
//type FilteringFunction = <T>(item: T) => boolean;
//TODO dalej rzucałoby błędy

enum Storage {
  LOCAL = "localStorage",

  SESSION = "sessionStorage",
}

const prefix = window.location.host;
export class LocalStorage {
  static addPrefix(key: string) {
    return prefix + key;
  }
  static removePrefix(key: string) {
    return key.replace(prefix, "");
  }

  static set(key: string, value: any) {
    localStorage.setItem(this.addPrefix(key), JSON.stringify(value));
  }
  static get(key: string) {
    return localStorage.getItem(this.addPrefix(key)) as string;
  }
  static remove(key: string) {
    localStorage.removeItem(this.addPrefix(key));
  }
  static clear() {
    localStorage.clear();
  }
  static key(index: number) {
    return localStorage.key(index);
  }

  static getAll() {
    let result = [];
    for (let key in localStorage) {
      if (key.includes(prefix)) {
        result.push(JSON.parse(this.get(this.removePrefix(key))));
      }
    }

    return result;
  }

  static getFilteredContent(fn: FilteringFunction) {
    let ary = this.getAll();
    let result = [];
    if (ary) {
      result = ary.filter(fn);
    }

    return result;
  }
  static isSupported() {
    const storage = window[Storage.LOCAL];
    try {
      let x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);

      return true;
    } catch (e) {
      return !!(
        e instanceof DOMException &&
        (e.code === 22 ||
          e.code === 1014 ||
          e.name === "QuotaExceededError" ||
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        storage &&
        storage.length !== 0
      );
    }
  }
}

export class FilteredStorage extends LocalStorage {
  data: Favorite[];

  constructor(fn: FilteringFunction) {
    super();
    this.data = LocalStorage.getFilteredContent(fn);
  }
  getLength() {
    return this.data.length;
  }
  hasContent() {
    return this.getLength() ? true : false;
  }
  hasCertainItem(fn: FilteringFunction) {
    return this.data.some(fn);
  }
  getForComparison() {
    const result = this.data.map(item => {
      return { label: item.label, url: createURL.weather(item.place, item.source, i18next.language) };
    });

    return result;
  }
  getAllItems() {
    return this.data;
  }
}
