import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClientModel } from '../../../models/client/client.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit() {

  }

  selectionChange(client) {
    this.router.navigate(['/client/' + client.id]);
  }
}
