import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

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

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    this.authService.loggedIn.subscribe(status => this.isLoggedIn = status);
    this.route.url.subscribe((event) => { console.log('change', event) });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }
}
