import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import * as jwt from 'webcrypto-jwt';

@Injectable()
export class XkeyService {
  protected XKEY = '__XKEY__';

  constructor(
    public storage: StorageService
  ) { }

  isCreated() {
    return !!this.storage.getKey(this.XKEY);
  }

  getKeyBySecret(secret: string): Promise<string> {
    return new Promise(res => {
      const value = this.storage.getKey(this.XKEY);
      if (!value)
        return res(null);
      jwt.verifyJWT(value, secret, 'HS256', (err, isValid) => {
        if (err || !isValid)
          return res(null);
        
         const {key} = jwt.parseJWT(value);
         res(key);
      });
    });
  }

  generateAndSignKey(secret: string) {
    return new Promise<any>((res, rej) => {
      jwt.signJWT({
        key: this.generateKey()
      }, secret, 'HS256', (err, token) => {
        if (err)
          return rej(err);
        this.storage.saveKey(this.XKEY, token);
        res();
      });
    });
    
  }

  generateKey() {
    var key = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
    for (var i = 0; i < 256; i++)
      key += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return key;
  }

}
