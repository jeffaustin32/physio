import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';

// Components
import { ClientComponent } from './client/client.component';
import { SharedModule } from '../../shared/shared.module';
import { EditClientComponent } from './edit-client/edit-client.component';
import { SelectedClientComponent } from './selected-client/selected-client.component';

// Services
import { AuthGuard } from '../../services/auth-guard/auth-guard.service';
import { ClientService } from '../../services/client/client.service';

// Models
import { ClientModel } from '../../models/client/client.model';
import { CoordinatesModel } from '../../models/coordinates.model';

// Pipes
import { TextFilterPipe } from '../../pipes/textfilter.pipe';

// export const clientModuleRoutes: Route[] = [
//   {
//     path: 'client',
//     component: ClientComponent,
//     canActivate: [AuthGuard],
//     children: [
//       {
//         path: 'details/:id',
//         component: EditClientComponent,
//         outlet: 'client'
//       },
//       {
//         path: 'edit/:id',
//         component: EditClientComponent,
//         outlet: 'client'
//       },
//       {
//         path: 'thirdParty/:id',
//         component: EditClientComponent,
//         outlet: 'client'
//       }
//     ]
//   }
// ];

export const clientModuleRoutes: Route[] = [
  {
    path: 'client',
    canActivate: [AuthGuard],
    component: ClientComponent
  }
];

@NgModule({
  declarations: [
    ClientComponent,
    EditClientComponent,
    SelectedClientComponent
  ],
  imports: [
    FormsModule,
    SharedModule,
    RouterModule,
    BrowserModule
  ],
  providers: [
    ClientService,
    TextFilterPipe
  ]
})
export class ClientModule { }