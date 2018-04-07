import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class FacadeGuard implements CanActivate {

  constructor(
    protected auth: AuthService,
    protected router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.auth.isAuth.pipe(
        tap(auth => {
          if (!auth)
            this.router.navigateByUrl('/login');
        })
      );
  }
}
