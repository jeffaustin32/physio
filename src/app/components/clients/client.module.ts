import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';

// Components
import { ClientComponent } from './client/client.component';
import { SharedModule } from '../../shared/shared.module';
import { EditClientComponent } from './edit-client/edit-client.component';
import { SelectedClientComponent } from './selected-client/selected-client.component';
import { NewClientComponent } from './new-client/new-client.component';

// Services
import { AuthGuard } from '../../services/auth-guard/auth-guard.service';
import { ClientService } from '../../services/client/client.service';
import { MapsService } from '../../services/maps/maps.service';

// Models
import { ClientModel } from '../../models/client.model';
import { CoordinatesModel } from '../../models/coordinates.model';

// Pipes
import { TextFilterPipe } from '../../pipes/textfilter.pipe';

export const clientModuleRoutes: Route[] = [
  {
    path: 'client',
    canActivate: [AuthGuard],
    component: ClientComponent
  },
  {
    path: 'client/new',
    canActivate: [AuthGuard],
    component: NewClientComponent
  },
  {
    path: 'client/:id',
    canActivate: [AuthGuard],
    component: SelectedClientComponent
  },
  {
    path: 'client/:id/edit',
    canActivate: [AuthGuard],
    component: EditClientComponent
  }
];

@NgModule({
  declarations: [
    ClientComponent,
    EditClientComponent,
    SelectedClientComponent,
    NewClientComponent
  ],
  imports: [
    FormsModule,
    SharedModule,
    RouterModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [
    ClientService,
    MapsService,
    TextFilterPipe
  ]
})
export class ClientModule { }