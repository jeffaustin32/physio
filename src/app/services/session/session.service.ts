import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';
import { SessionModel } from '../../models/session/session.model';
import { AuthService } from '../auth/auth.service';
import { BASE_URL, createAuthorizationHeader } from '../../shared/service.options';

@Injectable()
export class SessionService {
  constructor(private http: Http, private authService: AuthService) { }

  // Get all sessions
  getAllSessions() {
    return Observable.create((subscriber) => {
      this.http.get(BASE_URL + '/session',
        { headers: createAuthorizationHeader() })
        .map(res => res.json())
        .subscribe(
        (res) => {
          res.data.map(session => {           
            return new SessionModel(session.sessionId, session.clientId, session.invoiceId, session.sessionDate, session.notes, session.charge);
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

  // Get a session
  getSession(id: number) {
    return Observable.create((subscriber) => {
      this.http.get(BASE_URL + '/session' + id.toString(),
        { headers: createAuthorizationHeader() })
        .map(res => res.json())
        .subscribe(
        (res) => {
          res.data.map(session => {           
            return new SessionModel(session.sessionId, session.clientId, session.invoiceId, session.sessionDate, session.notes, session.charge);
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

  // Create a session
  createSession() {

  }

  // Update a session
  updateSession() {

  }
  // Delete a session
}
