import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';

import { MemberService } from "../../services/member.service";
import { IMember } from "../../models/member";

@Component({
    selector: "kz-member-details",
    templateUrl: "./member-details.component.html",
    styleUrls: [ "./member-details.component.css" ],
    //directives: [StarComponent]
})
export class MemberDetailsComponent implements OnInit {

    active: boolean = true;
    submitted: boolean = true;
    current_id: number = 0;
    saved_json: string = "";
    is_dirty: boolean = false;
    member: IMember = {id:0, first_name:'',last_name:'Loading...',key:'',starRating:0,selected:false,description:''};

    in_init: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: MemberService) {}

    ngOnInit() {
        console.log("MemberDetailsComponent#onInit: in init = "+this.in_init);

        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.service
                    .getMember(id)
                    .do(obj => { console.log("MemberDetails#init: obj...",obj); })
                    .subscribe(m => {this.member = m; console.log(this.member.birth); });
            });
    }

    isDirty(){
        console.log("MemberDetailsComponent#isDirty");
        return JSON.stringify(this.member) === this.saved_json;
    }

    onCancel(the_form) { 
        console.log("MemberDetailsComponent#cancel");
        this.member = JSON.parse(this.saved_json);
        this.submitted = true; 
        this.is_dirty = false;
    }

    onSubmit(the_form) { 
        console.log("MemberDetailsComponent#submit: the form...",the_form);
        this.saved_json = JSON.stringify(this.member);
        this.is_dirty = false;
        this.submitted = true; 
    }



    // newMember() {
    //     this.member = { id:0, key: "",
    //         first_name: "", last_name:"", 
    //         starRating: 0, selected: false, description: ""
    //     };
    //     this.resetPristine();
    //     this.submitted = false;
    // }

    resetPristine(){
        console.log("MemberDetailsComponent#resetPristine");

        // reseting the visibility of the form via the
        // active attribute (see html) will cause the
        // pristine attribute to reset, so first set active
        this.active = false;
        // then reset after a heartbeat to show
        setTimeout(() => this.active = true, 0);
    }
}
