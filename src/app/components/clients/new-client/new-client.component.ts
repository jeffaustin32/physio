import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

// Models
import { ClientModel } from '../../../models/client.model';
import { CoordinatesModel } from '../../../models/coordinates.model';

// Services
import { ClientService } from '../../../services/client/client.service';
import { MapsService } from '../../../services/maps/maps.service';

@Component({
  selector: 'new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {
  private client: FormGroup;

  // Form error messages
  formErrors = { 'postalCode': '' };
  validationMessages = {
    'postalCode': {
      'required': 'Required',
      'pattern': 'Invalid Format'
    }
  };

  constructor(private clientService: ClientService, private mapsService: MapsService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    // Instantiate a new form builder group
    this.client = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/)]],
      homePhone: [''],
      cellPhone: [''],
      email: [''],
      mileageRate: [''],
      sessionRate: [''],
      billingMethod: ['', Validators.required],
      notes: ['']
    })

    // Listen for input changes to display appropriate errors
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
    let practitioner = JSON.parse(localStorage.getItem('practitioner'));

    let practitionerAddress = practitioner.address + ', ' + practitioner.city + ', ' + practitioner.province;
    let newClientAddress = value.address + ', ' + value.city + ', ' + value.province;

    Observable.forkJoin([this.mapsService.geocode(newClientAddress), this.mapsService.distance(practitionerAddress, newClientAddress)])
      .subscribe(data => {
        // Get the coordinate 
        value.latLng = data[0] as CoordinatesModel;
        // Get the distance
        value.distance = 0;
        let distance: any = data[1] as any;        
        if (distance.rows[0] && distance.rows[0].elements[0]) {
          value.distance = distance.rows[0].elements[0].distance.value / 1000;
        }
        
        // Got the required data, create the new client
        this.createClient(value);
      });
  }

  createClient(client: ClientModel) {
    this.clientService.createClient(client)
      .subscribe((client) => {
        console.log('Client created successfully!');
        this.router.navigate(['/client/']);
      }, (err) => {
        console.log('created client failed');
        console.log(err);
      });
  }

  cancelClicked() {
    this.router.navigate(['/client/']);
  }
}
