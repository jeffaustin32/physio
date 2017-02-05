import { CoordinatesModel } from './coordinates.model';

export class ClientModel {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public address?: string,
        public postalCode?: string,
        public city?: string,
        public province?: string,
        public homePhone?: string,
        public cellPhone?: string,
        public fax?: string,
        public email?: string,
        public billingMethod?: string,
        public sessionRate?: number,
        public distance?: number,
        public mileageRate?: number,
        public latLng?: CoordinatesModel,
        public notes?: string,
        public payees?: ClientModel[],
        public active?: boolean
    ) { }
}
