import { Component, OnInit, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('inputError', [
      state('void', style({
        'transform': 'translateX(65%) scale(0)'
      })),
      transition('void => *', animate('100ms ease-in')),
      transition('* => void', animate('100ms ease-out'))
    ]),
     trigger('errorMessage', [
      state('void', style({
        'opacity': '0'
      })),
      state('*', style({
        'opacity': '1'
      })),
      transition('void => *', animate('300ms ease-in')),
      transition('* => void', animate('300ms ease-out'))
    ])
  ]
})
export class LoginComponent implements OnInit {
  private credentials: any = { username: '', password: '' };
  private loggingIn: boolean = false;
  private errorMessage: string = "";

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  login() {
    this.errorMessage = "";
    this.authService.login(this.credentials)
      .subscribe(() => {
        // Remove the logging in message
        this.loggingIn = false;

        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard';

        // Redirect the user
        this.router.navigate([redirect]);
      }, (err) => {
        console.log(err);
        // Display the login error message
        this.loggingIn = false;
        this.errorMessage = err;
      });
  }

}
