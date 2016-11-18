import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DialogService } from "../../services/dialog.service";
import { MemberService } from "../../services/member.service";
import { IMember, Member } from "../../models/member";

@Component({
    selector: "kz-member-edit",
    templateUrl: "./member-edit.component.html",
    styleUrls: [ "./member-edit.component.css" ]
})
export class MemberEditComponent implements OnInit {

    name: string = "MemberEditComponent";
    isLoading: boolean = false;
    isAuthorized: boolean = false;
    original: IMember = {
        id:0, key:'',starRating:0,selected:false,
        first_name:'',last_name:'', description:'',
        birth: {month:0, day: 0, year: 0, place: "" },
        death: {month:0, day: 0, year: 0, place: "" }
    };    
    member: IMember = {
        id:0, key:'',starRating:0,selected:false,
        first_name:'',last_name:'', description:'',
        birth: {month:0, day: 0, year: 0, place: "" },
        death: {month:0, day: 0, year: 0, place: "" }
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private MemberService: MemberService,
        public dialogService: DialogService) {}

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

                        let test = new Member(m);
                        console.log("test member...",test);

                        Object.assign(this.member, m); 
                        this.member.description = this.member.description || "";
                        this.member.birth = this.member.birth || {month:0, day: 0, year: 0, place: "" };
                        this.member.death = this.member.death || {month:0, day: 0, year: 0, place: "" };

                        Object.assign(this.original, this.member); 
                        Object.assign(this.original.birth, this.member.birth); 
                        Object.assign(this.original.death, this.member.death); 

                        this.isLoading = false;
                    });
            });
    }

    hasChanged(){
        if ( this.different( this.original,       this.member      ) ) return true;
        if ( this.different( this.original.birth, this.member.birth) ) return true;
        if ( this.different( this.original.death, this.member.death) ) return true;
        return false; // has not changed
    }

    different(obj1,obj2){
        let j1: string = JSON.stringify(obj1);
        let j2: string = JSON.stringify(obj2);
        console.log("j1 = "+j1);
        console.log("j2 = "+j2);
        return j1 !== j2;
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
