import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Models
import { ClientModel } from '../../../models/client/client.model';

// Services
import { ClientService } from '../../../services/client/client.service';

@Component({
  selector: 'edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  @Input() selectedClient: ClientModel;
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  constructor(private clientService: ClientService) { }

  ngOnInit() {
  }

  saveClicked() {
    this.clientService.updateClient(this.selectedClient)
      .subscribe((clients) => {
        console.log('back in subscribe result');
        this.onSave.emit();
      }, (err) => {
        console.log(err);
      });
  }

  cancelClicked() {
    this.onCancel.emit();
  }

  deleteClicked() {
    this.clientService.deleteClient(this.selectedClient.id)
      .subscribe((clients) => {
        console.log('back in subscribe result');
        this.onDelete.emit();
      }, (err) => {
        console.log(err);
      });
  }

}
