import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';

import { XkeyService } from './xkey.service';

@Injectable()
export class AuthService {
  protected currentKey$: BehaviorSubject<string>;

  get isAuth() {
    return this.currentKey$.pipe(
      map(result => !!result)
    );
  }

  constructor(
    protected xkeys: XkeyService
  ) { 
    this.currentKey$ = new BehaviorSubject(xkeys.getPublicKey());
  }

}
