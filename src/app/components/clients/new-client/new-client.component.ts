import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  private client: FormGroup;

  formErrors = {
    'postalCode': ''
  };

  validationMessages = {
    'postalCode': {
      'required': 'Required',
      'pattern': 'Invalid Format'
    }
  };

  constructor(private clientService: ClientService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.client = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/)]],
      homePhone: [''],
      cellPhone: [''],
      email: [''],
      notes: ['']
    })

    this.client.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.client) { return; }
    const form = this.client;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }


  onSubmit({value, valid}: { value: ClientModel, valid: boolean }) {

    if (!valid) {
      console.log('New client is not valid');
      return;
    }
    
    console.log(value, valid);

    this.clientService.createClient(value)
      .subscribe((client) => {
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
