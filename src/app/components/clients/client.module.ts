import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { ClientComponent } from './client/client.component';
import { SharedModule } from '../../shared/shared.module';
import { SelectedClientComponent } from './selected-client/selected-client.component';

import { AuthGuard } from '../../services/auth-guard/auth-guard.service';
import { ClientService } from '../../services/client/client.service';

export const clientModuleRoutes: Route[] = [
  {
    path: 'client',
    component: ClientComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'details/:id',
        component: SelectedClientComponent,
        outlet: 'client'
      },
      {
        path: 'edit/:id',
        component: SelectedClientComponent,
        outlet: 'client'
      },
      {
        path: 'thirdParty/:id',
        component: SelectedClientComponent,
        outlet: 'client'
      }
    ]
  }
];

@NgModule({
  declarations: [
    ClientComponent,
    SelectedClientComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    BrowserModule
  ],
  providers: [
    ClientService
  ]
})
export class ClientModule { }