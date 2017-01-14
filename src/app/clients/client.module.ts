import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { AuthGuard } from '../services/auth-guard/auth-guard.service';

export const clientModuleRoutes: Route[] = [
  { path: 'client', component: ClientComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [ClientComponent]
})
export class ClientModule { }