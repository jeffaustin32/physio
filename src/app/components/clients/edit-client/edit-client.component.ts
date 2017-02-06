import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Models
import { ClientModel } from '../../../models/client.model';

// Services
import { ClientService } from '../../../services/client/client.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  private selectedClient: ClientModel = new ClientModel();

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

  saveClicked() {
    this.clientService.updateClient(this.selectedClient)
      .subscribe((clients) => {
        this.notificationService.success("Success", this.selectedClient.firstName + " " + this.selectedClient.lastName + " was updated.");
        this.router.navigate(['/client/']);
      }, (err) => {
        console.log(err);
      });
  }

  cancelClicked() {
        this.router.navigate(['/client/']);
  }

  deleteClicked() {
    this.clientService.deleteClient(this.selectedClient.id)
      .subscribe((clients) => {
        console.log('back in subscribe result');
       
      }, (err) => {
        console.log(err);
      });
  }



}
