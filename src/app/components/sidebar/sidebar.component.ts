import { Component, OnInit, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { MENU_ITEMS } from './sidebar.menu-items';

import 'rxjs/add/operator/filter';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('flyInOut', [
      state('*', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.3s 0s ease-out'),
      ])
    ])
  ]
})

export class SidebarComponent implements OnInit {
  private menuItems: any[] = MENU_ITEMS;
  private isLoggedIn: boolean = false;
  
  constructor(private router: Router, private authService: AuthService) {
    this.authService.loggedIn.subscribe(status => this.isLoggedIn = status);
  }

  ngOnInit() {
  }
}
