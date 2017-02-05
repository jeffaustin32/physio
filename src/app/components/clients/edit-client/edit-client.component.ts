import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Models
import { ClientModel } from '../../../models/client.model';

// Services
import { ClientService } from '../../../services/client/client.service';

@Component({
  selector: 'edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  private selectedClient: ClientModel = new ClientModel();

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit() {
  }

  saveClicked() {
    this.clientService.updateClient(this.selectedClient)
      .subscribe((clients) => {
        console.log('back in subscribe result');
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
