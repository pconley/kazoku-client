import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';

import { MemberService } from "../../services/member.service";
import { IMember } from "../../models/member";

@Component({
    selector: "kz-member-edit",
    templateUrl: "./member-edit.component.html",
    styleUrls: [ "./member-edit.component.css" ]
})
export class MemberEditComponent implements OnInit {

    isLoading: boolean = false;
    isAuthorized: boolean = false;
    member: IMember = {id:0, 
        first_name:'',last_name:'Loading...',
        key:'',starRating:0,selected:false,
        description:'',
        birth: {month:0, day: 0, year: 0, place: "" },
        death: {month:0, day: 0, year: 0, place: "" }
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private MemberService: MemberService) {}

    ngOnInit() {
        console.log("*** MemberEditComponent#init");
        this.isLoading = true;
        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.MemberService
                    .getMember(id)
                    .do(obj => { console.log("*** MemberEditComponent#init: obj...",obj); })
                    .subscribe(m => {
                        this.member = m; 
                        this.member.description = this.member.description || "";
                        this.member.birth = this.member.birth || {month:0, day: 0, year: 0, place: "" };
                        this.member.death = this.member.death || {month:0, day: 0, year: 0, place: "" };
                        this.isLoading = false;
                    });
            });
    }

    goto_show(){
        // page action... navigate to the show page for this user
        console.log("*** MemberEditComponent#goto_show: id = "+this.member.id);
        this.router.navigate(['/member', this.member.id]);
    }

    onSubmit(form) { 
        console.log("*** MemberEditComponent#submit");
        // note that this.member already has all the form changes
        // becasue we use the ngModel to link form to memeber
        if(form.valid) {
            this.MemberService.saveMember(this.member);
            this.goto_show();
        } else {
            alert("Member Edit Form Not Valid");
        }
    }

}
