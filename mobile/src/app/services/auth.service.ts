import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private _authKey = 'asdjfkhasdfnk';
  private _auth = new BehaviorSubject<boolean>(this._storage.getKey(this._authKey));

  get isAuth() {
    return this._auth.pipe(
      map(result => !!result)
    );
  }

  constructor(
    protected router: Router,
    private _storage: StorageService
  ) {
  }

  signIn(secret?, seed?) {
    this._storage.saveKey(this._authKey, true);
    this._auth.next(true);
    return this.router.navigateByUrl('/');
  }

  signUp(secret?) {
    this._storage.saveKey(this._authKey, true);
    this._auth.next(true);
    return this.router.navigateByUrl('/');
  }

  logout() {
    this._storage.saveKey(this._authKey, false);
    this._auth.next(false);
    this.router.navigateByUrl('/login');
  }

}
