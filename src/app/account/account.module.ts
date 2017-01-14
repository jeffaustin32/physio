import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { AccountComponent } from './account.component';
import { AuthGuard } from '../services/auth-guard/auth-guard.service';

export const accountModuleRoutes: Route[] = [
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [AccountComponent]
})
export class AccountModule { }