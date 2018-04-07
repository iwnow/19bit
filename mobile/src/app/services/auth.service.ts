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

  async signIn(secret, seed) {
    await this.xkeys.createKeyPair(secret, seed);
    this.currentKey$.next(this.xkeys.getPublicKey());
    this.router.navigateByUrl('/');
  }

  async signUp(secret) {
    const seed = await this.xkeys.createKeyPair(secret);
    this.currentKey$.next(this.xkeys.getPublicKey());
    this.router.navigateByUrl('/');
    return seed;
  }

  logout() {
    this.xkeys.removeKeys();
    this.currentKey$.next(null);
    this.router.navigateByUrl('/login');
  }

}
