import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// Components
import { CardComponent } from './card/card.component';
import { ClientsListComponent } from './clients-list/clients-list.component';

// Pipes
import { TextFilterPipe } from '../pipes/textfilter.pipe';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule
  ],
  declarations: [
    CardComponent,
    TextFilterPipe,
    ClientsListComponent
  ],
  exports: [
      CardComponent,
      ClientsListComponent,
      TextFilterPipe
  ]
})
export class SharedModule { }