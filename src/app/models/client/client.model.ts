export class ClientModel {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public dob?: Date,
        public address?: string,
        public postalCode?: string,
        public city?: string,
        public province?: string,
        public homePhone?: string,
        public cellPhone?: string,
        public fax?: string,
        public email?: string,
        public billing_method?: string,
        public payees?: ClientModel[],
        public is_client?: boolean,
        public active?: boolean
    ) { }
}
