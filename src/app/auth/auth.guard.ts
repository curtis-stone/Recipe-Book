/* Handles: runs logic right before a route is loaded and denies access to route if
a certain condition is not met!

For route protection and disabling direct access to pages w/o authentication */

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor (private authService: AuthService, 
                private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        router: RouterStateSnapshot
        ): 
        | boolean
        | UrlTree 
        | Promise<boolean | UrlTree> 
        | Observable<boolean | UrlTree> {
           return this.authService.user.pipe(
               take(1),
               map(user => {
                   const isAuth = !!user;

                if (isAuth) {
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
           })) // transforms the user observable into a boolean to be used in routes we want to protect w/ guard (in app-routing.module)
    }
}