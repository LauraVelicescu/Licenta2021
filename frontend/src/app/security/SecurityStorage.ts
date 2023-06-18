import {Injectable} from "@angular/core";


@Injectable()
export class SecurityStorage {
  static storageKey = "Authorization";
  static permissionKey = "Permission";
  static loggedUser = "LoggedUser";

  store(obj: string) {
    try {
      window.localStorage[SecurityStorage.storageKey] = obj;
    } catch {
    }

  }

  storeLoggedUser(obj: string) {
    try {
      window.localStorage[SecurityStorage.loggedUser] = obj;
    } catch {
    }
  }

  getLoggedUser() {
    try {
      return (window.localStorage[SecurityStorage.loggedUser] as number)|| null;
    } catch {
      return null;
    }
  }

  storePermissions(obj: string[]) {
    try {
      window.localStorage[SecurityStorage.permissionKey] = obj;
    } catch {
    }
  }

  getPermissions() {
    try {
      return (window.localStorage[SecurityStorage.permissionKey] as string).split(',') || null;
    } catch {
      return null;
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
      window.localStorage.removeItem(SecurityStorage.permissionKey);
      window.localStorage.removeItem(SecurityStorage.loggedUser);
    } catch {
    }
  }
}
