import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientModel } from '../../models/client/client.model';
import { CoordinatesModel } from '../../models/coordinates.model';
import { AuthService } from '../auth/auth.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientService {
  private baseUrl: string = 'http://localhost:3000/api'

  constructor(private http: Http, private authService: AuthService) { }

  // Get all the clients
  getAllClients() {
    return Observable.create((subscriber) => {
      this.http.get(this.baseUrl + '/client',
        { headers: this.createAuthorizationHeader() })
        .map(res => res.json())
        .subscribe(
        (res) => {
          res.data.map(client => {
            client.latLng = JSON.parse(client.latLng);
            return new ClientModel(client.id, client.firstName, client.lastName, client.address, client.postalCode, client.city, client.province, client.homePhone, client.cellPhone, client.fax, client.email, client.billingMethod, client.sessionRate, client.distance, client.mileageRate, new CoordinatesModel(client.latLng.coordinates[0], client.latLng.coordinates[1]), client.notes, [], client.active);
          });

          subscriber.next(res.data);
          subscriber.complete();
        },
        (err) => {
          if (err.status === 401) {
            this.authService.renewLogin();
          }
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

  // Update a client
  updateClient(client: ClientModel) {
    console.log('client', client);
    return Observable.create((subscriber) => {
      this.http.put(this.baseUrl + '/client/' + client.id.toString(), JSON.stringify({ client: client }), { headers: this.createAuthorizationHeader() })
        .map(res => res.json())
        .subscribe(
        (res) => {
          console.log('success', res);
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

  // Update a client
  deleteClient(clientId: number) {
    return Observable.create((subscriber) => {
      this.http.delete(this.baseUrl + '/client/' + clientId.toString(), { headers: this.createAuthorizationHeader() })
        .map(res => res.json())
        .subscribe(
        (res) => {
          console.log('success', res);
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
    let header = new Headers({ 'Authorization': token, 'Content-Type': 'application/json' });
    return header;
  }
}
