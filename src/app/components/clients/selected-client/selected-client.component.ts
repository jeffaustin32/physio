import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ClientModel } from '../../../models/client/client.model';
import { ClientService } from '../../../services/client/client.service';

@Component({
  selector: 'selected-client',
  templateUrl: './selected-client.component.html',
  styleUrls: ['./selected-client.component.css']
})
export class SelectedClientComponent implements OnInit {
  @Input() selectedClient: ClientModel;
  @Output() onEdit: EventEmitter<any> = new EventEmitter();

  constructor(private clientService: ClientService, private router: Router) {
    this.clientService.getClient(1)
      .subscribe((client) => {
        this.selectedClient = client;
      }, (err) => {
        console.log(err);
      });
  }

  ngOnInit() {
  }

  editClicked() {
    this.router.navigate(['/client/' + this.selectedClient.id + '/edit']);
  }
}
