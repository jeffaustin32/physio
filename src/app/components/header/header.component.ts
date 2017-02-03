import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'header-nav',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('headerState', [
      transition('void => *', [
        style({ opacity: '0' }),
        animate('200ms ease-in'),
      ]),
      transition('* => void', [
        style({ opacity: '*' }),
        animate('200ms ease-out')
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  private title: string = 'Dashboard';
  private isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.authService.loggedIn.subscribe(status => {
      this.isLoggedIn = status;
    });

    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(event => event as NavigationEnd)
      .map(event => event.urlAfterRedirects.match(/[^\/]+/))
      .subscribe(url => this.title = url[0].charAt(0).toUpperCase() + url[0].slice(1));
  }
}
