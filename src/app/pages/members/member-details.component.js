System.register(["@angular/core", "@angular/router", "./member.service"], function (exports_1, context_1) {
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
    var core_1, router_1, member_service_1, MemberDetailsComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (member_service_1_1) {
                member_service_1 = member_service_1_1;
            }
        ],
        execute: function () {
            MemberDetailsComponent = (function () {
                function MemberDetailsComponent(route, router, service) {
                    this.route = route;
                    this.router = router;
                    this.service = service;
                    this.active = true;
                    this.submitted = true;
                    this.current_id = 0;
                    this.saved_json = "";
                    this.is_dirty = false;
                    this.member = { id: 0, first_name: '', last_name: 'Loading...', key: '', starRating: 0, selected: false, description: '' };
                    this.in_init = false;
                }
                MemberDetailsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    console.log("MemberDetailsComponent#onInit: in init = " + this.in_init);
                    this.route.params
                        .map(function (params) { return params['id']; })
                        .subscribe(function (id) {
                        _this.service
                            .getMember(id)
                            .subscribe(function (m) { return _this.member = m; });
                    });
                };
                MemberDetailsComponent.prototype.isDirty = function () {
                    console.log("MemberDetailsComponent#isDirty");
                    return JSON.stringify(this.member) === this.saved_json;
                };
                MemberDetailsComponent.prototype.onCancel = function (the_form) {
                    console.log("MemberDetailsComponent#cancel");
                    this.member = JSON.parse(this.saved_json);
                    this.submitted = true;
                    this.is_dirty = false;
                };
                MemberDetailsComponent.prototype.onSubmit = function (the_form) {
                    console.log("MemberDetailsComponent#submit: the form...", the_form);
                    this.saved_json = JSON.stringify(this.member);
                    this.is_dirty = false;
                    this.submitted = true;
                };
                // newMember() {
                //     this.member = { id:0, key: "",
                //         first_name: "", last_name:"", 
                //         starRating: 0, selected: false, description: ""
                //     };
                //     this.resetPristine();
                //     this.submitted = false;
                // }
                MemberDetailsComponent.prototype.resetPristine = function () {
                    var _this = this;
                    console.log("MemberDetailsComponent#resetPristine");
                    // reseting the visibility of the form via the
                    // active attribute (see html) will cause the
                    // pristine attribute to reset, so first set active
                    this.active = false;
                    // then reset after a heartbeat to show
                    setTimeout(function () { return _this.active = true; }, 0);
                };
                return MemberDetailsComponent;
            }());
            MemberDetailsComponent = __decorate([
                core_1.Component({
                    selector: "kz-member-details",
                    templateUrl: "client/members/member-details.component.html",
                    styleUrls: ["client/members/member-details.component.css"],
                }),
                __metadata("design:paramtypes", [router_1.ActivatedRoute,
                    router_1.Router,
                    member_service_1.MemberService])
            ], MemberDetailsComponent);
            exports_1("MemberDetailsComponent", MemberDetailsComponent);
        }
    };
});
//# sourceMappingURL=member-details.component.js.map