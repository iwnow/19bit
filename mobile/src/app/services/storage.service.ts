import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  getKey<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key));
  }

  saveKey(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeKey(key: string) {
    localStorage.removeItem(key);
  }

}
