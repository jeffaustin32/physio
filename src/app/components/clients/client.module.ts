import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { ClientComponent } from './client/client.component';
import { SharedModule } from '../../shared/shared.module';

import { AuthGuard } from '../../services/auth-guard/auth-guard.service';
import { SelectedClientComponent } from './selected-client/selected-client.component';

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
    RouterModule
  ]
})
export class ClientModule { }