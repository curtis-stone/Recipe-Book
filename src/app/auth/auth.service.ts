/* Handles: authentication services & https requests to database to enable features that
are only accesible through user authentication.

Tokens
Token expirations
Token Clears*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'

import { User } from './user.model';
import { environment } from '../../environments/environment'


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string; 
  registered?: boolean
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  printLog(arg0: string) {
    throw new Error("Method not implemented.");
  }

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  constructor(private http: HttpClient,
              private router: Router) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
        {
          email: email, 
          password: password, // email and password req. from API get the type email/password name from form
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError), tap(responseData => {
        this.handleAuthentication(
          responseData.email, 
          responseData.localId, 
          responseData.idToken,
          +responseData.expiresIn
        )
          
      })
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey, 
      {
        email: email, 
        password: password, // email and password req. from API get the type email/password name from form
        returnSecureToken: true})
        .pipe(
          catchError(this.handleError), tap(responseData => {
          this.handleAuthentication(
            responseData.email, 
            responseData.localId, 
            responseData.idToken,
            +responseData.expiresIn
          )}))
          }

    autoLogin() {
      const userData: {
        email: string,
        id: string,
        _token: string,
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData')) // parse to get string from local storage and turn it into a useable JS user object for app.
      if (!userData) {
        return;
      } 

      const loadedUser = new User(
        userData.email, 
        userData.id, 
        userData._token, 
        new Date(userData._tokenExpirationDate)
        );
        if (loadedUser.token) {
          this.user.next(loadedUser)
          const expirationDuration = new Date(userData._tokenExpirationDate).getTime() 
          - new Date().getTime()
          // eaquation = future date (in milliseconds (from .getTime())) minus current date (in milliseconds (getTime())) gives difference in milliseconds of the token has until it expires (1 hour)
          this.autoLogout(expirationDuration)
        }
        // run OnInit early in application (app.component) to automatically run this function!
    }

    logout() {
      this.user.next(null);
      this.router.navigate(['auth']);
      localStorage.removeItem('userData'); //clears local storage data os user on logout
      if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer)
      }
      this.tokenExpirationTimer = null
    }

    autoLogout(expirationDuration: number) {
      this.tokenExpirationTimer = setTimeout(() => {
        this.logout();
      }, expirationDuration)
      console.log(expirationDuration)
      // call whenever we emit a new user in appplication (handleAuthentication() & autoLogin() to make sure timer actually starts and will go off
    }

  private handleAuthentication(
    //order important
    email:string, 
    userId: string, 
    token: string, 
    expiresIn: number) {
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
      // gets token expiration time in milliseconds and uses new Date() to convert it to a timestamp date object
      const user = new User(
        email, 
        userId,
        token,
        expirationDate
        );
        this.user.next(user);
        this.autoLogout(expiresIn * 1000) // * 1000 b/c rexpiresIn is in sec. and autoLogout setTimeout expects millisec.
        localStorage.setItem('userData', JSON.stringify(user)); // take user ubject and convert it to a string to be stored in local storage
          // uses the user subject to set/emit this as our currently logged in user
       }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured'
        if (!errorResponse.error || !errorResponse.error.error) { //errorResponse/error/error in console.log folders
          return throwError(errorMessage);
        }
        switch (errorResponse.error.error.message) {
          case 'EMAIL_EXISTS': 
            errorMessage = 'This email already exists';
            break;
          case 'INVALID_PASSWORD': 
            errorMessage = 'This password is invalid';
            break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email was not found';
            break;
          case 'USER_DISABLED':
            errorMessage = 'User has been disabled'
        }
        return throwError(errorMessage);
      }
}
