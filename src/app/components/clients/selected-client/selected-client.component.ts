import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClientModel } from '../../../models/client/client.model';

@Component({
  selector: 'selected-client',
  templateUrl: './selected-client.component.html',
  styleUrls: ['./selected-client.component.css']
})
export class SelectedClientComponent implements OnInit {
  @Input() selectedClient: ClientModel;
  @Output() onEdit: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  editClicked() {
    this.onEdit.emit();
  }
}
