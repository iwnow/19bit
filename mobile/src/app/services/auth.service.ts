import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';

import { XkeyService } from './xkey.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  protected currentKey$: BehaviorSubject<string>;

  get isAuth() {
    return this.currentKey$.pipe(
      map(result => !!result)
    );
  }

  constructor(
    protected xkeys: XkeyService,
    protected router: Router
  ) { 
    this.currentKey$ = new BehaviorSubject(xkeys.getPublicKey());
  }

  async signIn(secret, privateKey) {
    const pubKey = await this.xkeys.createPublicKey(secret, privateKey);
    this.currentKey$.next(pubKey);
    this.router.navigateByUrl('/');
  }

  async signUp(secret) {
    const pubKey = await this.xkeys.createKeyPair(secret);
    this.currentKey$.next(pubKey);
    this.router.navigateByUrl('/');
  }

  logout() {
    this.xkeys.removeKeys();
    this.currentKey$.next(null);
    this.router.navigateByUrl('/login');
  }

}
