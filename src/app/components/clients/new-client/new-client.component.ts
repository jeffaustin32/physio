import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Models
import { ClientModel } from '../../../models/client/client.model';

// Services
import { ClientService } from '../../../services/client/client.service';

@Component({
  selector: 'new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {
  private newClient: ClientModel = new ClientModel();

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit() {
  }

  createClicked() {
    this.clientService.createClient(this.newClient)
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
}
