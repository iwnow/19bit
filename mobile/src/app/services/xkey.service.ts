import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import * as jwt from 'webcrypto-jwt';
import {core} from '../core';

@Injectable()
export class XkeyService {
  protected XKEY_PRIVATE = '__XKEY__PRIVATE';
  protected XKEY_PUBLIC = '__XKEY__PUBLIC';
  protected ALGO = 'HS256';

  constructor(
    public storage: StorageService
  ) { }

  isCreated() {
    return !!this.storage.getKey(this.XKEY_PRIVATE);
  }

  getPublicKey(): string {
    return this.storage.getKey(this.XKEY_PUBLIC);
  }

  getPrivateKeyBySecret(secret: string): Promise<string> {
    return new Promise(res => {
      const value = this.storage.getKey(this.XKEY_PRIVATE);
      if (!value)
        return res(null);
      jwt.verifyJWT(value, secret, this.ALGO, (err, isValid) => {
        if (err || !isValid)
          return res(null);
        
         const {key} = jwt.parseJWT(value);
         res(key);
      });
    });
  }

  /**generate private and return seed */
  createKeyPair(secret: string, seedIn?: string) {
    return new Promise<string>((res, rej) => {
      try {
        const seed = seedIn ? seedIn : core.genSeed();
        const pair = core.genKeyPair(seed);
        this.saveKeys(secret, pair.private, pair.public)
          .then(value => {
            res(seed);
          });

      } catch (e) {
        rej(e.message);
      }
    });
  }

  removeKeys() {
    this.storage.removeKey(this.XKEY_PRIVATE);
    this.storage.removeKey(this.XKEY_PUBLIC);
  }

  protected saveKeys(secret: string, privateKey: string, publicKey: string) {
    return new Promise<string>((res, rej) => {
      jwt.signJWT({
        key: privateKey
      }, secret, this.ALGO, (err, token) => {
        if (err)
          return rej(err);

        this.storage.saveKey(this.XKEY_PRIVATE, token);
        this.storage.saveKey(this.XKEY_PUBLIC, publicKey);
        res(publicKey);
      });
    });
  }

}
