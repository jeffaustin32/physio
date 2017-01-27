import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClientModel } from '../../../models/client/client.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  private selectedClient:ClientModel;
  private editMode:boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit() {

  }

  selectionChange(client) {
    this.selectedClient = client;
  }

  changeMode() {
    this.editMode = !this.editMode;
  }
}
