System.register(["@angular/core"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var core_1, MemberFilterPipe;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            MemberFilterPipe = (function () {
                function MemberFilterPipe() {
                }
                MemberFilterPipe.prototype.transform = function (value, args) {
                    // WIERD... the args are not as advertised in the tutorial
                    // that said args[0] would be the frst string; but each char
                    // is coming over as a separate string
                    //console.log(args);
                    if (!args)
                        return value; // no filter
                    if (!args[0])
                        return value; // no filter
                    var str = args[0];
                    // join was not found here?????
                    for (var i = 1; i < args.length; i++) {
                        str += args[i];
                    }
                    var filter = str.toLocaleLowerCase();
                    //console.log("memberFilter: "+filter);
                    var result = value.filter(function (member) {
                        return member.first_name.toLocaleLowerCase().indexOf(filter) !== -1;
                    });
                    return result;
                };
                return MemberFilterPipe;
            }());
            MemberFilterPipe = __decorate([
                core_1.Pipe({
                    name: 'memberFilter'
                }),
                __metadata("design:paramtypes", [])
            ], MemberFilterPipe);
            exports_1("MemberFilterPipe", MemberFilterPipe);
        }
    };
});
//# sourceMappingURL=member-filter.pipe.js.map