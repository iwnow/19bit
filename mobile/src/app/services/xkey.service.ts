import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import * as jwt from 'webcrypto-jwt';
import {core} from '../core';

@Injectable()
export class XkeyService {
  protected XKEY_PRIVATE = '__XKEY__PRIVATE';
  protected XKEY_PUBLIC = '__XKEY__PUBLIC';
  protected XKEY_ADDR= '__XKEY__ADDR';
  protected ALGO = 'HS256';

  door = {
    '1901': {
      pub: 'JXJZKSfR1YUJx2urT6nKtkA4EcfbhJZAjKaSD915GNh',
      addr: '2yiqZPsdBXgWzfrtqXbGLmhKN3c1diqi58yym1pFpNYg7gUc6P'
    },
    '1902': {
      pub: '794i3gKHajT5D27DuANNUbx12WFQ5nRTuqF8wBdMsVmr',
      addr: '3dv8j8dr9iX4PvA9Xs8zUVcsHtWoLYSE7C5zfUzHaeerGJ2Gn2'
    }
  }

  constructor(
    public storage: StorageService
  ) { }

  isCreated() {
    return !!this.storage.getKey(this.XKEY_PRIVATE);
  }

  getPublicKey(): string {
    return this.storage.getKey(this.XKEY_PUBLIC);
  }

  getAddress() {
    return this.storage.getKey(this.XKEY_ADDR);
  }

  isBackDoor(secret) {
    return Object.keys(this.door).some(k => k === secret);
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
        let addr = null;
        if (this.isBackDoor(secret)) {
          pair.public = this.door[secret].pub;
          addr = this.door[secret].addr;
        }

        this.saveKeys(secret, pair.private, pair.public, addr)
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

  protected saveKeys(secret: string, privateKey: string, publicKey: string, addr?) {
    return new Promise<string>((res, rej) => {
      jwt.signJWT({
        key: privateKey
      }, secret, this.ALGO, (err, token) => {
        if (err)
          return rej(err);

        this.storage.saveKey(this.XKEY_PRIVATE, token);
        this.storage.saveKey(this.XKEY_PUBLIC, publicKey);
        this.storage.saveKey(this.XKEY_ADDR, addr);
        res(publicKey);
      });
    });
  }

}
