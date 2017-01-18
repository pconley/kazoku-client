import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';

//import { FirememService } from "../../services/firemem.service";
import { AngularFire } from 'angularfire2';
import { Member } from "../../models/member";

@Component({
    selector: "kz-member-show",
    templateUrl: "./member-show.component.html",
    styleUrls: [ "./member-show.component.css" ]
})
export class MemberShowComponent implements OnInit {

    public member = {}; 
    public siblings = []; 
    public family = {};

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private af: AngularFire,
        //private FirememService: FirememService
    ) {}

    ngOnInit() {
        console.log("*** MemberShowComponent#init route...",this.route);
        this.route.params
            .map(params => params['id'])
            .do( id => console.log("--> member id = "+id))
            .subscribe((id) => {
                this.get_member(id)
                    .subscribe( obj => {
                        this.member = obj;
                        this.get_family( obj.famc ).subscribe( array => { this.family = array[0]; })
                        this.get_members( obj.famc ).subscribe( array => { this.siblings = array; });
                })
            });
    }

    get_member( id ){
        console.log("--- assign ind: id = "+id);
        return this.af.database
            .object('/members/'+id)
            .do( obj => console.log("--> firebase member object...",obj) )
    }

    get_members( famkey ){
        console.log("--- get members: famkey = "+famkey);
        return this.af.database
            .list('/members',{query: {orderByChild: 'famc', equalTo: famkey}})
            .do( array => console.log("--> firebase members list...",array) )
    }

    get_family( famkey ){
        console.log("--- assign fam: famkey = "+famkey);
        return this.af.database
            .list('/families',{query: {orderByChild: 'key', equalTo: famkey}})
            .do( array => console.log("--> firebase family object...",array[0]) )
    }

    goto_edit(){
        // page action... navigate to the edit page for this user
        // console.log("*** Membershow#goto_edit: id = "+this.member.id);
        // this.router.navigate(['/member/edit', this.member.id]);
    }
}
