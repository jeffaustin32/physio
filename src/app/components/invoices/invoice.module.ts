import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route } from '@angular/router';
import { InvoiceComponent } from './invoice/invoice.component';
import { AuthGuard } from '../../services/auth-guard/auth-guard.service';
import { InvoiceService } from '../../services/invoice/invoice.service';
import { SharedModule } from '../../shared/shared.module';

export const invoiceModuleRoutes: Route[] = [
    { path: 'invoice', component: InvoiceComponent, canActivate: [AuthGuard] }
];

@NgModule({
    declarations: [
        InvoiceComponent
    ],
    imports: [
        BrowserModule,
        SharedModule
    ],
    providers: [
        InvoiceService
    ]
})
export class InvoiceModule { }