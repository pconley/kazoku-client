System.register(["@angular/core", "@angular/http", "@angular/common", "./member.routing", "./member-list.component", "./member-details.component", "../shared/star.component", "@angular/forms", "./member-filter.pipe", "../pipes/titlecase.pipe", "../service/auth.guard"], function (exports_1, context_1) {
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
    var core_1, http_1, common_1, member_routing_1, member_list_component_1, member_details_component_1, star_component_1, forms_1, member_filter_pipe_1, titlecase_pipe_1, auth_guard_1, MemberModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (member_routing_1_1) {
                member_routing_1 = member_routing_1_1;
            },
            function (member_list_component_1_1) {
                member_list_component_1 = member_list_component_1_1;
            },
            function (member_details_component_1_1) {
                member_details_component_1 = member_details_component_1_1;
            },
            function (star_component_1_1) {
                star_component_1 = star_component_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (member_filter_pipe_1_1) {
                member_filter_pipe_1 = member_filter_pipe_1_1;
            },
            function (titlecase_pipe_1_1) {
                titlecase_pipe_1 = titlecase_pipe_1_1;
            },
            function (auth_guard_1_1) {
                auth_guard_1 = auth_guard_1_1;
            }
        ],
        execute: function () {
            MemberModule = (function () {
                function MemberModule() {
                }
                return MemberModule;
            }());
            MemberModule = __decorate([
                core_1.NgModule({
                    imports: [
                        common_1.CommonModule,
                        forms_1.FormsModule,
                        http_1.HttpModule,
                        member_routing_1.MemberRouting
                    ],
                    providers: [auth_guard_1.CanActivateViaAuthGuard],
                    declarations: [
                        member_list_component_1.MemberListComponent, member_details_component_1.MemberDetailsComponent,
                        member_filter_pipe_1.MemberFilterPipe, titlecase_pipe_1.TitleCasePipe,
                        star_component_1.StarComponent
                    ],
                    bootstrap: [member_list_component_1.MemberListComponent]
                }),
                __metadata("design:paramtypes", [])
            ], MemberModule);
            exports_1("MemberModule", MemberModule);
        }
    };
});
//# sourceMappingURL=member.module.js.map