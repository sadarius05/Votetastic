import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { User } from '@supabase/supabase-js';
import { filter, map, Observable, take, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.getCurrentUser().pipe(
      filter((val) => val !== null),
      take(1),
      map((isAuthenticated: User) => {
        if (isAuthenticated.user_metadata) {
          console.log(
            'isAuthenticated',
            isAuthenticated,
            isAuthenticated.user_metadata
          );
          return true;
        } else {
          return this.router.createUrlTree(['/']);
        }
      })
    );
  }
}
