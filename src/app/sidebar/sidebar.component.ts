import { Component, OnInit, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth/auth.service';

import 'rxjs/add/operator/filter';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(-100%)' })),
      transition('out => in', [
        animate(300, keyframes([
          style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
        ]))
      ]),
      transition('in => out', [
        animate(300, keyframes([
          style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
          style({ opacity: 0, transform: 'translateX(-100%)', offset: 1.0 })
        ]))
      ])
    ])
  ]
})

export class SidebarComponent implements OnInit {
  private menuItems: any[] = [
    { text: 'Clients', path: '/client' },
    { text: 'Sessions', path: '/session' },
    { text: 'Invoices', path: '/invoice' },
  ]

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
  }
}
