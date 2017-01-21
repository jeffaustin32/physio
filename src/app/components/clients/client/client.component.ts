import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  private clients = [{ 'first_name': 'jeff' }, { 'first_name': 'jhon' }];

  constructor(public clientService: ClientService) {
    this.clientService.getAllClients()
      .subscribe((newClients) => {
        this.clients = newClients;
      }, (err) => {
        console.log(err);
      });
  }

  ngOnInit() {

  }

}
