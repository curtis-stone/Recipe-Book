/* Handles: */

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap, map, tap } from 'rxjs/operators';
import { RecipebookService } from '../recipe-book/recipebook.service';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService,
                private recipeBookService: RecipebookService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        
      
        return this.authService.user.pipe(
            take(1), // take 1 value from observable and then unsubscribe
            exhaustMap(user => {
                if (!user) {
                    return next.handle(request);
                }
              const modifiedReq = request.clone({
                  params: new HttpParams().set('auth', user.token)
                })
        
            return next.handle(modifiedReq)
        }))
    }
}