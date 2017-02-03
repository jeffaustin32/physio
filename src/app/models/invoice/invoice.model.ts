import { SessionModel } from '../session/session.model';
import { InvoiceItemModel } from '../invoice-item/invoice-item.model';

export class InvoiceModel {
    constructor(
        public id?: number,
        public clientId?: number,
        public invoiceDate?: Date,
        public notes?: string,

        public sessions?: SessionModel [],
        public items?: InvoiceItemModel [],
        public payments?: any [],
        public invoicePaymentTotal?: number,
        public sessionTotal?: number,
        public invoiceItemTotal?: number,
        public invoiceTotal?: number
    ) { }
}
