import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { TextFilterPipe } from '../pipes/textfilter.pipe';

@NgModule({
  declarations: [
    CardComponent,
    TextFilterPipe
  ],
  exports: [
      CardComponent,
      TextFilterPipe
  ]
})
export class SharedModule { }