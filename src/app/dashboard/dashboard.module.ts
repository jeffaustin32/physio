import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../services/auth-guard/auth-guard.service';

export const dashboardModuleRoutes: Route[] = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [DashboardComponent]
})
export class DashboardModule { }