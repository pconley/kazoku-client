System.register(["@angular/core", "@angular/router", "../service/auth.service", "./member.service"], function (exports_1, context_1) {
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
    var core_1, router_1, auth_service_1, member_service_1, MemberListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (member_service_1_1) {
                member_service_1 = member_service_1_1;
            }
        ],
        execute: function () {
            MemberListComponent = (function () {
                function MemberListComponent(router, authService, memberService) {
                    this.router = router;
                    this.authService = authService;
                    this.memberService = memberService;
                    this.imageWidth = 30;
                    this.imageMargin = 2;
                    this.showImage = false;
                    this.listFilter = "";
                    this.count = 0;
                    this.status = '';
                    this.loading = false;
                    this.members = [];
                    this.previousMember = null;
                    console.log("*** MemberListComponent#constructor");
                }
                MemberListComponent.prototype.ngOnInit = function () {
                    console.log("*** MemberListComponent#OnInit");
                    this.loader(false); // do not force re-load of members
                };
                MemberListComponent.prototype.onSelect = function (member) {
                    var same = this.previousMember == member;
                    console.log(">>> selected same=" + same, member);
                    if (same)
                        member.selected = !member.selected;
                    else {
                        member.selected = true;
                        if (this.previousMember)
                            this.previousMember.selected = false;
                    }
                    this.previousMember = member;
                    this.router.navigate(['/member', member.id]);
                };
                MemberListComponent.prototype.refresh = function () { this.loader(true); };
                MemberListComponent.prototype.loader = function (force) {
                    var _this = this;
                    console.log("--- MemberListComponent#loader force=" + force);
                    this.members = [];
                    this.count = 0;
                    this.loading = true;
                    this.status = "Loading";
                    // NOTE: getMembers will use the cached results (if they exist)
                    // unless we set the forced argument (passed in from above); also
                    // getMembers might return all the data in one emit or over several
                    this.memberService.getMembers(force)
                        .subscribe(function (data) {
                        console.log("*** loading. records = " + data.length);
                        Array.prototype.push.apply(_this.members, data);
                        _this.count = _this.members.length;
                    }, function (error) {
                        console.log("*** error");
                        _this.count = 0;
                        _this.members = [];
                        _this.loading = false;
                        _this.status = "Error: " + error.message;
                    }, function () {
                        console.log("*** done");
                        _this.loading = false;
                        _this.status = "Done";
                    });
                };
                MemberListComponent.prototype.toggleImage = function () {
                    this.showImage = !this.showImage;
                };
                MemberListComponent.prototype.onRatingClicked = function (msg) {
                    console.log('list#onRatingClicked ' + msg);
                };
                return MemberListComponent;
            }());
            MemberListComponent = __decorate([
                core_1.Component({
                    selector: "kz-members",
                    templateUrl: "client/members/member-list.component.html",
                    styleUrls: ["client/members/member-list.component.css"],
                }),
                __metadata("design:paramtypes", [router_1.Router,
                    auth_service_1.AuthService,
                    member_service_1.MemberService])
            ], MemberListComponent);
            exports_1("MemberListComponent", MemberListComponent);
        }
    };
});
//# sourceMappingURL=member-list.component.js.map