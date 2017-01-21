import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AngularFire } from 'angularfire2';

import { Member } from "../../models/member";
import { FirememService } from "../../services/firemem.service";

@Component({
    selector: "kz-member-show",
    templateUrl: "./member-show.component.html",
    styleUrls: [ "./member-show.component.css" ]
})
export class MemberShowComponent implements OnInit {

    public member = {}; 
    public memkey = ""; 
    public father = {}; 
    public example = {};
    public mother = {}; 
    public parents = []; 
    public siblings = []; 
    public children = []; 
    public spouses = []; // keys

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private af: AngularFire,
        private fms: FirememService
    ) {}

    ngOnInit() {
        console.log("*** MemberShowComponent#init route...",this.route);
        this.route.params
            .map(params => params['id'])
            .do( id => console.log("route changed to member id = "+id))
            .do( id => this.clear_globals() )
            .subscribe( id => this.load_globals(id) );
    }

    clear_globals() {
        //console.log("#clear");
        this.member = {};
        this.memkey = "";
        this.father = null;
        this.mother = {};
        this.parents = [];
        this.children = [];
        this.siblings = [];
        this.spouses = [];
    }
 
    load_globals(id: string) {
        console.log("MemberShowComponent#load id="+id);
        this.fms.get_member(id)
            .subscribe( obj => {
                this.member = obj;
                this.memkey = obj["key"];
                if( obj.famc ){
                    this.fms.get_members( obj.famc ).subscribe( array => { this.siblings = array; });
                    this.fms.get_family( obj.famc ).subscribe( array => {
                        var family = array[0]; 
                        if( family ){ 
                            console.log("getting parents for...",family);
                            this.fms.get_mem_by_key( family['wife'] ).subscribe( arr => {this.mother = arr[0]} );
                            this.fms.get_mem_by_key( family['husb'] ).subscribe( arr => {this.father = arr[0]} );
                        }
                    })
                }

                if( obj.fams ){
                    obj.fams.forEach( key => {
                        // children
                        this.fms.get_members( key ).subscribe( array => { 
                            this.children = this.children.concat(array); 
                        });
                        // spouses
                        this.fms.get_family( key ).subscribe( array => {
                            var fam = array[0];
                            console.log("fam obj...",fam);
                            if( fam ){
                                if( this.memkey != fam['wife'] ) {
                                    this.fms
                                        .get_mem_by_key( fam['wife'] )
                                        .subscribe( arr => {
                                            this.spouses.push(arr[0]);
                                        });
                                }
                                if( this.memkey != fam['husb'] ) {
                                    this.fms
                                        .get_mem_by_key( fam['husb'] )
                                        .subscribe( arr => {
                                            this.spouses.push(arr[0]);
                                        });
                                }
                            }
                        });

                    });
                }
        })
    }

    //fireError(errmsg){ console.error("firebase error = "+errmsg); }

    goto_edit(){
        // page action... navigate to the edit page for this user
        // console.log("*** Membershow#goto_edit: id = "+this.member.id);
        // this.router.navigate(['/member/edit', this.member.id]);
    }
}
