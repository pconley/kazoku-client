import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FirememService } from "../../services/firemem.service";
import { MemberService } from "../../services/member.service";
import { AngularFire } from 'angularfire2';
import { Member } from "../../models/member";

@Component({
    selector: "kz-member-show",
    templateUrl: "./member-show.component.html",
    styleUrls: [ "./member-show.component.css" ]
})
export class MemberShowComponent implements OnInit {

    // i think we need a dummy member while it loads
    //public member: Member = new Member({}); 
    public member = {}; 

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private af: AngularFire,

        private MemberService: MemberService,
        private FirememService: FirememService) {}

    ngOnInit() {
        console.log("*** MemberShowComponent#init route...",this.route);

        this.route.params
            .map(params => params['id'])
            .do( id => console.log("--> member id = "+id))
            .subscribe((id) => {
                this.af.database
                    .object('/members/'+id)
                    .do( obj => console.log("--> firebase member object...",obj) )
                    .subscribe( obj => {
                        this.member = obj;
                    })
            });
    }

    // to_string(event){
    //     if( !event ) return "";
    //     return event.month + "/" +event.day + "/" + event.year + " " + event.place;
    // }

    goto_edit(){
        // page action... navigate to the edit page for this user
        // console.log("*** Membershow#goto_edit: id = "+this.member.id);
        // this.router.navigate(['/member/edit', this.member.id]);
    }
}
