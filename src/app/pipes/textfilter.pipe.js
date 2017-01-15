"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var TextFilterPipe = (function () {
    function TextFilterPipe() {
    }
    TextFilterPipe.prototype.transform = function (items, args) {
        return items.filter(function (item) {
            var match = false;
            if (args[1].length === 0) {
                return items;
            }
            for (var i = 0; i < args[0].length; i++) {
                match = new RegExp(args[1], 'i').test(item[args[0][i]]);
                if (match) {
                    break;
                }
            }
            return match;
        });
    };
    TextFilterPipe = __decorate([
        core_1.Pipe({
            name: 'textfilter',
            pure: false
        }), 
        __metadata('design:paramtypes', [])
    ], TextFilterPipe);
    return TextFilterPipe;
}());
exports.TextFilterPipe = TextFilterPipe;
//# sourceMappingURL=textfilter.pipe.js.map