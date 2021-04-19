import {Injectable} from '@angular/core';


@Injectable()
export class SecurityStorage {
  static storageKey = 'Authorization';

  store(obj: string) {
    try {
      window.localStorage[SecurityStorage.storageKey] = obj;
    } catch {
    }

  }

  getStored(): string | null {
    try {
      return window.localStorage[SecurityStorage.storageKey] || null;
    } catch {
      return null;
    }
  }

  clear() {
    try {
      window.localStorage.removeItem(SecurityStorage.storageKey);
    } catch {
    }
  }
}
