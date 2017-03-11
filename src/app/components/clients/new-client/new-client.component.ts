import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

// Models
import { ClientModel } from '../../../models/client.model';
import { CoordinatesModel } from '../../../models/coordinates.model';

// Services
import { ClientService } from '../../../services/client/client.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {
  private client: FormGroup;
  private thirdParty: FormGroup;
  private hasThirdParty: boolean;

  // Form error messages
  formErrors = { 'postalCode': 'Required' };
  validationMessages = {
    'postalCode': {
      'required': 'Required',
      'pattern': 'Invalid Format'
    }
  };

  constructor(private clientService: ClientService, private router: Router, private fb: FormBuilder, private notificationService: NotificationsService) { }

  ngOnInit() {
    // Instantiate a new form builder group
    this.client = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      province: ['BC', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/)]],
      homePhone: [''],
      cellPhone: [''],
      email: [''],
      mileageRate: [null],
      sessionRate: [null],
      billingMethod: ['Email', Validators.required],
      notes: ['']
    });

    this.thirdParty = this.fb.group({
      firstName: [''],
      lastName: [''],
      address: [''],
      city: [''],
      province: ['BC'],
      postalCode: ['', [Validators.pattern(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/)]],
      homePhone: [''],
      cellPhone: [''],
      email: [''],
    });

    // Listen for input changes to display appropriate errors
    this.client.valueChanges
      .subscribe(data => {
        this.onValueChanged(data);
      });
    this.thirdParty.valueChanges
      .subscribe(data => {
        this.onValueChanged(data);
      });
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

  // Create the new client
  onSubmit({value, valid}: { value: ClientModel, valid: boolean }) {
    this.clientService.createClient(value)
      .subscribe((client) => {
        this.notificationService.success("Success", "Added " + value.firstName + " " + value.lastName + " as a new client");
        console.log('client', client);
        this.router.navigate(['/client/']);
      }, (err) => {
        this.notificationService.error("Error", "Failed to add " + value.firstName + " " + value.lastName + " as a new client");
        console.log(err);
      });
  }

  cancelClicked() {
    this.router.navigate(['/client/']);
  }
}
