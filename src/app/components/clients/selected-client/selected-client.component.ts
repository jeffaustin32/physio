import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

import { ClientModel } from '../../../models/client.model';
import { ClientService } from '../../../services/client/client.service';
import { ModalComponent } from '../../../shared/modal.component';

@Component({
  selector: 'selected-client',
  templateUrl: './selected-client.component.html',
  styleUrls: ['./selected-client.component.css']
})
export class SelectedClientComponent implements OnInit {
  @ViewChild(ModalComponent)
  public readonly modal: ModalComponent;
  private selectedClient: ClientModel;

  constructor(private clientService: ClientService, private router: Router, private route: ActivatedRoute, private notificationService: NotificationsService) { }

  ngOnInit() {
    // Get the client id from the route parameters
    this.route.params.subscribe(params => {
      // Get the client
      this.clientService.getClient(+params['id'])
        .subscribe((client) => {
          this.selectedClient = client;
        }, (err) => {
          console.log(err);
        });
    });
  }

  onDelete() {
    // Delete the client
    this.clientService.deleteClient(this.selectedClient.id)
      .subscribe((client) => {
        this.notificationService.success("Success", this.selectedClient.firstName + " " + this.selectedClient.lastName + " was deleted.");
        this.router.navigate(['/client/']);
      }, (err) => {
        console.log(err);
      });
  }

  onEdit() {
    this.router.navigate(['/client/' + this.selectedClient.id + '/edit']);
  }
}
