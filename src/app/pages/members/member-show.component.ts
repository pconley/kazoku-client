import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';

import { MemberService } from "../../services/member.service";
import { IMember } from "../../models/member";

@Component({
    selector: "kz-member-show",
    templateUrl: "./member-show.component.html",
    //styleUrls: [ "./member-show.component.css" ]
})
export class MemberShowComponent implements OnInit {

    birth_string: string = null;
    death_string: string = null;
    member: IMember = {id:0, 
        first_name:'',last_name:'',
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
        console.log("*** MemberShowComponent#init route...",this.route);

        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.MemberService
                    .getMember(id)
                    .do(obj => { console.log("*** MemberShow#init: obj...",obj); })
                    .subscribe(m => {
                        Object.assign(this.member,m); 
                        console.log("birth...",this.member.birth);
                        this.birth_string = this.to_string(this.member.birth);
                        this.death_string = this.to_string(this.member.death);
                     });
            });
    }

    to_string(event){
        if( !event ) return "";
        return event.day + "/" +event.month + "/" + event.year + " " + event.place;
    }

    goto_edit(){
        // page action... navigate to the edit page for this user
        console.log("*** Membershow#goto_edit: id = "+this.member.id);
        this.router.navigate(['/member/edit', this.member.id]);
    }
}
