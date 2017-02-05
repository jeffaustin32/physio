import { CoordinatesModel } from './coordinates.model';

export class PractitionerModel {
    constructor(
            public first_name?: string,
            public last_name?: string,
            public designation?: string,
            public reg_body?: string,
            public practice_desc?: string,
            public address?: string,
            public postal_code?: string,
            public city?: string,
            public province?: string,
            public email?: string,
            public home_phone?: string,
            public cell_phone?: string,
            public fax?: string,
            public default_charge?: string,
            public latLng?: CoordinatesModel
    ) { }
}
