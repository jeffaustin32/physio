import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';
import { InvoiceModel } from '../../models/invoice.model';
import { AuthService } from '../auth/auth.service';
import { BASE_URL, createAuthorizationHeader } from '../../shared/service.options';

@Injectable()
export class InvoiceService {
  constructor(private http: Http, private authService: AuthService) { }

  // Get all invoices
  getAllInvoices() {
    return Observable.create((subscriber) => {
      this.http.get(BASE_URL + '/invoice',
        { headers: createAuthorizationHeader() })
        .map(res => res.json())
        .subscribe(
        (res) => {
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

}
