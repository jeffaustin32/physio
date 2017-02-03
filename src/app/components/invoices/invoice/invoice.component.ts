import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../../services/invoice/invoice.service';
import { InvoiceModel } from '../../../models/invoice/invoice.model';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  private invoices: InvoiceModel[];

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.invoiceService.getAllInvoices()
      .subscribe((invoices) => {
        this.invoices = invoices;
      }, (err) => {
        console.log(err);
      });
  }

}
