import { Injectable, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { WavesService } from './waves.service';

interface UserInfo {
  address: string
  data: string;
  host: string;
  icon: string;
  name: string;
  prefix: string;
  publicKey: string;
  signature: string;
  timestamp: number;
}
@Injectable()
export class AuthService {
  private _authKey = 'asdjfkhasdfnk';
  private _auth = new BehaviorSubject<boolean>(Boolean(this._storage.getKey(this._authKey)));

  get isAuth() {
    return this._auth.pipe(
      map(result => !!result)
    );
  }

  constructor(
    protected router: Router,
    private _storage: StorageService,
    readonly waves: WavesService,
  ) {
  }

  getUserInfo(): UserInfo {
    return this._storage.getKey(this._authKey);
  }

  setUserInfo(info: Partial<UserInfo>) {
    info = info || {};
    const cur = this.getUserInfo();
    const next = {
      ...cur,
      ...info
    };
    this._storage.saveKey(this._authKey, next);
    return next;
  }

  signIn(secret?, seed?) {
    return this.waves.auth().then(res => {
      console.log(res);
      this.setUserInfo(res)
      this._auth.next(true);
      this.router.navigateByUrl('/');
    }).catch(console.error);

  }

  signUp(secret?) {
    // this._storage.saveKey(this._authKey, true);
    // this._auth.next(true);
    // return this.router.navigateByUrl('/');
  }

  logout() {
    this._storage.saveKey(this._authKey, null);
    this._auth.next(false);
    this.router.navigateByUrl('/login');
  }

}
