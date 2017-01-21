import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { SessionComponent } from './session/session.component';
import { AuthGuard } from '../../services/auth-guard/auth-guard.service';

export const sessionModuleRoutes: Route[] = [
  { path: 'session', component: SessionComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [SessionComponent]
})
export class SessionModule { }