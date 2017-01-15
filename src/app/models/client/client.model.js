"use strict";
var ClientModel = (function () {
    function ClientModel(id, firstName, lastName, dob, address, postalCode, city, province, homePhone, cellPhone, fax, email, billing_method, payees, is_client, active) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.address = address;
        this.postalCode = postalCode;
        this.city = city;
        this.province = province;
        this.homePhone = homePhone;
        this.cellPhone = cellPhone;
        this.fax = fax;
        this.email = email;
        this.billing_method = billing_method;
        this.payees = payees;
        this.is_client = is_client;
        this.active = active;
    }
    return ClientModel;
}());
exports.ClientModel = ClientModel;
//# sourceMappingURL=client.model.js.map