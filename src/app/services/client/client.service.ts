import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';
import { ClientModel } from '../../models/client.model';
import { CoordinatesModel } from '../../models/coordinates.model';
import { AuthService } from '../auth/auth.service';
import { BASE_URL, createAuthorizationHeader } from '../../shared/service.options';

@Injectable()
export class ClientService {
  constructor(private http: Http, private authService: AuthService) { }

  // Get all the clients
  getAllClients() {
    return Observable.create((subscriber) => {
      this.http.get(BASE_URL + '/client',
        { headers: createAuthorizationHeader() })
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
  getClient(clientId: number) {
    console.log('in get cilent');
    return Observable.create((subscriber) => {
      this.http.get(BASE_URL + '/client/' + clientId.toString(),
        { headers: createAuthorizationHeader() })
        .map(res => res.json())
        .subscribe(
        (res) => {
          subscriber.next(res.data);
          subscriber.complete();
        },
        (err) => {
          // Token has expired or user is not authorized to view
          if (err.status === 401) {
            this.authService.renewLogin();
          }
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

  // Create a client
  createClient(client: ClientModel) {
    console.log(client);
    return Observable.create((subscriber) => {
      this.http.post(BASE_URL + '/client/', JSON.stringify({ client: client }), { headers: createAuthorizationHeader() })
        .map(res => res.json())
        .subscribe(
        (res) => {
          console.log(res);
          client.id = res.data;
          subscriber.next(client);
          subscriber.complete();
        },
        (err) => {
          console.log(err);
          // Internal Server Error
          subscriber.error('Yikes! Looks like there was a server error.');
        });
    });
  }

  // Update a client
  updateClient(client: ClientModel) {
    return Observable.create((subscriber) => {
      this.http.put(BASE_URL + '/client/' + client.id.toString(), JSON.stringify({ client: client }), { headers: createAuthorizationHeader() })
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
      this.http.delete(BASE_URL + '/client/' + clientId.toString(), { headers: createAuthorizationHeader() })
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


}
