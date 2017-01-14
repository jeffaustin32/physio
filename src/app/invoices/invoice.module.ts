import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { InvoiceComponent } from './invoice/invoice.component';
import { AuthGuard } from '../services/auth-guard/auth-guard.service';

export const invoiceModuleRoutes: Route[] = [
    { path: 'invoice', component: InvoiceComponent, canActivate: [AuthGuard] }
];

@NgModule({
    declarations: [InvoiceComponent]
})
export class InvoiceModule { }