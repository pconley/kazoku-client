// import { Component, Inject } from '@angular/core';

// @Component({
//   template: '<p>testing</p>'
// })
// export class AnyComponent {

//   constructor(@Inject(FirebaseApp) firebaseApp: any) {
//     const storageRef = firebaseApp.storage().ref().child('images/image.png');
//     storageRef.getDownloadURL().then(url => this.image = url);
//   }
// }

import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FirebaseApp } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

import { Member } from "../../models/member";
import { FirememService } from "../../services/firemem.service";

@Component({
    selector: "kz-member-show",
    templateUrl: "./member-show.component.html",
    styleUrls: [ "./member-show.component.css" ]
})
export class MemberShowComponent implements OnInit {

    //private FMS;

    public id;
    public source;

    public member = {}; 
    public memkey = ""; 
    public father = {}; 
    public example = {};
    public mother = {}; 
    public parents = []; 
    public siblings = []; 
    public children = []; 
    public spouses = [];

    

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private af: AngularFire,
        //private fba: FirebaseApp,
        @Inject(FirebaseApp) private FBA,
        private fms: FirememService
    ) {}

    ngOnInit() {
        //console.log("*** MemberShowComponent#init route...",this.route);
        //this.FMS = this.fms;
        this.route.params
            .map(params => params['id'])
            .do( id => console.log("route changed to member id = "+id))
            .do( id => this.clear_globals() )
            .do( id => this.id = id )
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
        console.log("MemberShowComponent#load_globals id="+id);
        this.source = './assets/images/male-two-tone.png';

        this.fms
            .get_member(id)
            .do( mem => console.log("member...",mem) )
            .subscribe( mem => {
                this.member = mem;
                this.memkey = mem["key"];
                let gen = mem['sex'] === 'm' ? 'male' : 'female';
                this.source = `./assets/images/${gen}-two-tone.png`;
                this.load_image(mem.image);
                if( mem.famc ){
                    // load siblings
                    this.fms
                        .get_members( mem.famc )
                        .subscribe( array => { 
                            // but, filter out the current member from sibling list
                            this.siblings = array.filter( m => m.key != this.memkey ); 
                        });
                    // load parents
                    this.fms
                        .get_family( mem.famc )
                        .subscribe( obj => { this.load_parents(obj) });
                 }
                if( mem.fams ){
                    mem.fams.forEach( key => {
                        // load children
                        this.fms
                            .get_members( key )
                            .subscribe( array => { this.children = this.children.concat(array); });
                        // load spouses
                        this.fms
                            .get_family( key )
                            .subscribe( obj => this.load_spouses(obj) );
                    });
                }
        })
    }

    load_image(filename){
        console.log('load image',filename);
        if( !filename ) return; 
        const image_url = `images/${filename}`;
        const storageRef = this.FBA.storage().ref().child(image_url);            
        storageRef.getDownloadURL().then(url => {
                console.log("source url",url);
                this.source = url;
        });
    }

    load_parents(fam){
        //console.log("show#load_parents: fam...",fam);
        if( !fam ) return; // no action
        this.push_parent( fam['husb'] );
        this.push_parent( fam['wife'] );
    }

    push_parent(key){
        //console.log("show#push_parent: key = " + key);
        if( key == this.memkey ) return; // no action
        this.fms
            .get_mem_by_key( key )
            //.do( mem => console.log(key+' push parent mem...',mem) )
            .subscribe( mem => {
                if( mem.key ) this.parents.push(mem);
            });
    }

    load_spouses(fam){
        //console.log("show#load_spouses: fam...",fam);
        if( !fam ) return; // no action
        this.push_spouse( fam['husb'] );
        this.push_spouse( fam['wife'] );
    }

    push_spouse(key){
        // console.log("show#push_spouse: key = " + key);
        if( key == this.memkey ) return; // no action
        this.fms
            .get_mem_by_key( key )
            //.do( mem => console.log(key+' push spouse mem...',mem) )
            .subscribe( mem => {
                if( mem.key) this.spouses.push(mem);
            })
    }

    //fireError(errmsg){ console.error("firebase error = "+errmsg); }

    goto_edit(){
        // page action... navigate to the edit page for this user
        // console.log("*** Membershow#goto_edit: id = "+this.member.id);
        this.router.navigate(['/member/edit', this.id]);
    }
}
