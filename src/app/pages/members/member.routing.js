System.register(["@angular/core", "@angular/router", "./member-list.component", "./member-details.component", "../service/auth.guard"], function (exports_1, context_1) {
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
    var core_1, router_1, member_list_component_1, member_details_component_1, auth_guard_1, MemberRouting;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (member_list_component_1_1) {
                member_list_component_1 = member_list_component_1_1;
            },
            function (member_details_component_1_1) {
                member_details_component_1 = member_details_component_1_1;
            },
            function (auth_guard_1_1) {
                auth_guard_1 = auth_guard_1_1;
            }
        ],
        execute: function () {
            MemberRouting = (function () {
                function MemberRouting() {
                }
                return MemberRouting;
            }());
            MemberRouting = __decorate([
                core_1.NgModule({
                    imports: [
                        router_1.RouterModule.forChild([
                            { path: 'members', component: member_list_component_1.MemberListComponent, canActivate: [auth_guard_1.CanActivateViaAuthGuard] },
                            { path: 'member/:id', component: member_details_component_1.MemberDetailsComponent, canActivate: [auth_guard_1.CanActivateViaAuthGuard] }
                        ])
                    ],
                    exports: [router_1.RouterModule]
                }),
                __metadata("design:paramtypes", [])
            ], MemberRouting);
            exports_1("MemberRouting", MemberRouting);
        }
    };
});
//# sourceMappingURL=member.routing.js.map