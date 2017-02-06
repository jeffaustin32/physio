import { Component, OnInit, AfterViewInit, trigger, state, style, transition, animate, keyframes, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { ClientService } from '../../services/client/client.service';

// Models
import { ClientModel } from '../../models/client.model';

@Component({
  selector: 'clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('*', style({
        opacity: 1
      })),
      state('void', style({
        opacity: 0
      })),
      transition('void => *', [
        animate('100ms ease-in'),
      ]),
      transition('* => void', [
        animate('100ms ease-out')
      ])
    ])
  ]
})

export class ClientsListComponent implements OnInit {
  @Output() selectionChange: EventEmitter<any> = new EventEmitter();

  public clients: ClientModel[] = [];
  public nameFilterText: string = '';
  private selectedId: number;

  constructor(public clientService: ClientService, private router: Router) {
  }

  ngOnInit() {
    // Get locally stored clients until server responds
    this.clients = JSON.parse(localStorage.getItem('clients')) || [];

    this.clientService.getAllClients()
      .subscribe((clients) => {
        console.log('got clients??', clients);
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
