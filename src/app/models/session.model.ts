export class SessionModel {
    constructor(
        public id?: number,
        public clientId?: number,
        public invoiceId?: number,
        public sessionDate?: Date,
        public notes?: string,
        public charge?: number
    ) { }
}
