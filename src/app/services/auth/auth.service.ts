import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  public isLoggedIn: boolean = false;

  // Store the URL so we can redirect after logging in
  public redirectUrl: string;
  private baseUrl: string = 'http://localhost:3000/api'

  constructor(private http: Http, private router: Router) { }

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
          // Store the token in local storage
          localStorage.setItem('token', JSON.stringify(res.data.token));
          this.isLoggedIn = true;

          subscriber.next();
          subscriber.complete();
        },
        (err) => {
          console.log('here');
          // Bad Request
          if (err.status === 400) {
            subscriber.error('Uh... You didn\'t enter all the required info.');
          }
          // Unauthorized
          else if (err.status === 401) {
          console.log('here 2');
            subscriber.error('Whoops! You entered incorrect login information.'); 
          } 
          // Internal Server Error
          else if (err.status === 500) {
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
