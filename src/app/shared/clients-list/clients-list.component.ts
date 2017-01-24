import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { ClientService } from '../../services/client/client.service';

// Models
import { ClientModel } from '../../models/client/client.model';

@Component({
  selector: 'clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})

export class ClientsListComponent implements OnInit {
  @Output() selectionChange: EventEmitter<any> = new EventEmitter();

  public clients: ClientModel[] = [];
  public nameFilterText: string = '';
  private selectedId: number;

  constructor(public clientService: ClientService, private router: Router) {
  }

  ngOnInit() {
    this.clientService.getAllClients()
      .subscribe((clients) => {
        this.clients = clients;
      }, (err) => {
        console.log(err);
      });
  }

  isSelected(client: ClientModel) {
    return client.id === this.selectedId;
  }

  onSelect(client: ClientModel) {
    if (this.selectedId != client.id) {
      this.selectionChange.emit(client);
    }

    this.selectedId = client.id;
  }
}
