import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// Components
import { CardComponent } from './card/card.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientSummaryComponent } from './summary-cards/client-summary/client-summary.component';
import { InvoiceSummaryComponent } from './summary-cards/invoice-summary/invoice-summary.component';
import { ModalComponent } from './modal.component';

// Pipes
import { TextFilterPipe } from '../pipes/textfilter.pipe';
import { SessionSummaryComponent } from './summary-cards/session-summary/session-summary.component';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule
  ],
  declarations: [
    CardComponent,
    TextFilterPipe,
    ClientsListComponent,
    ClientSummaryComponent,
    InvoiceSummaryComponent,
    SessionSummaryComponent,
    ModalComponent
  ],
  exports: [
    CardComponent,
    ClientsListComponent,
    ClientSummaryComponent,
    InvoiceSummaryComponent,
    SessionSummaryComponent,
    TextFilterPipe,
    ModalComponent
  ]
})
export class SharedModule {
}