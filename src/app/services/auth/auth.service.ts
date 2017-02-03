import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, NavigationEnd } from '@angular/router';

import { ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  public isLoggedIn: boolean = false;
  public loggedIn: ReplaySubject<any> = new ReplaySubject(1);

  // Store the URL so we can redirect after logging in
  public redirectUrl: string;
  public currentUrl: string;
  private baseUrl: string = 'http://localhost:3000/api'

  constructor(private http: Http, private router: Router) {
    router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((val) => this.currentUrl = val.url);

    if (this.isAuthorized()) {
      if (this.currentUrl != '' && this.currentUrl != '/login') {
        this.loggedIn.next(true);
        this.isLoggedIn = true;
      } else {
        this.loggedIn.next(false);
        this.isLoggedIn = false;
      }
    }
  }

  login(credentials) {
    // Make a login request to the server
    return Observable.create((subscriber) => {
      this.http.post(this.baseUrl + '/login', {
        username: credentials.username,
        password: credentials.password
      })
        .map(res => res.json())
        .subscribe(
        (res) => {
          
          console.log(res);

          // Store the token in local storage
          localStorage.setItem('token', JSON.stringify(res.data.token));
          localStorage.setItem('practitioner', JSON.stringify(res.data.practitioner));
          this.isLoggedIn = true;
          this.loggedIn.next(true);

          subscriber.next(this.redirectUrl);
          this.redirectUrl = "";
          subscriber.complete();
        },
        (err) => {
          // Bad Request
          if (err.status === 400) {
            subscriber.error('Uh... You didn\'t enter all the required info.');
          }
          // Unauthorized
          else if (err.status === 401) {
            subscriber.error('Whoops! You entered incorrect login information.');
          }
          // Internal Server Error
          else {
            subscriber.error('Yikes! Looks like there was a server error.')
          }

        });
    });
  }

  // Logout by removing the user's token from local storage
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.isLoggedIn = false;
    this.loggedIn.next(false);
  }

  renewLogin() {
    this.logout();
    this.redirectUrl = this.currentUrl;
  }

  // Check if the user data and token exist in storage
  isAuthorized() {
    if (localStorage.getItem('token')) {
      return true;
    }

    return false;
  }

  // Create an Authorization header to allow access to secured server endpoints
  createAuthorizationHeader(): Headers {
    let token: string = JSON.parse(localStorage.getItem('authData'));
    let header = new Headers({ 'Authorization': token });
    return header;
  }
}
