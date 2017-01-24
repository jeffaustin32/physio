import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClientModel } from '../../../models/client/client.model';

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

  constructor() { }

  ngOnInit() {
  }

  saveClicked() {
    this.onSave.emit();
  }

  cancelClicked() {
    this.onCancel.emit();
  }

  deleteClicked() {
    this.onDelete.emit();
  }

}
