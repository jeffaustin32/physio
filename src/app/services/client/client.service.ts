import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientService {
  private baseUrl: string = 'http://localhost:3000/api'

  constructor(private http: Http, private router: Router) { }

  // Get all the clients
  getAllClients() {
    return Observable.create((subscriber) => {
      this.http.get(this.baseUrl + '/client',
        { headers: this.createAuthorizationHeader() })
        .map(res => res.json())
        .subscribe(
        (res) => {
          console.log(res);
          subscriber.next(res.data);
          subscriber.complete();
        },
        (err) => {
          // Internal Server Error
          subscriber.error('Yikes! Looks like there was a server error.')
        });
    });
  }

  // Get a single client by their ID
  getAClient(clientId: number) {
    return Observable.create((subscriber) => {
      this.http.get(this.baseUrl + '/client/' + clientId.toString(),
        { headers: this.createAuthorizationHeader() })
        .map(res => res.json())
        .subscribe(
        (res) => {
          console.log(res);
          subscriber.next(res.data);
          subscriber.complete();
        },
        (err) => {
          // Not Found
          if (err.status === 404) {
            subscriber.error('This client doesn\'t exist');
          }
          // Internal Server Error
          else {
            subscriber.error('Yikes! Looks like there was a server error.');
          }
        });
    });
  }

  // Create an Authorization header to allow access to secured server endpoints
  createAuthorizationHeader(): Headers {
    let token: string = JSON.parse(localStorage.getItem('token'));
    let header = new Headers({ 'Authorization': token });
    return header;
  }
}
