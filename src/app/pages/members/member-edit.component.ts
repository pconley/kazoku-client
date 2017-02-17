import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

//import { FirememService } from "../../services/firemem.service";
import { DialogService } from "../../services/dialog.service";
import { Member } from "../../models/member";
 
@Component({
    selector: "kz-member-edit",
    templateUrl: "./member-edit.component.html",
    styleUrls: [ "./member-edit.component.css" ]
})
export class MemberEditComponent implements OnInit {

    gender = "Female";
    genders = ["Male","Female"];

    memberObj: FirebaseObjectObservable<Member>;
    memberObs: Observable<Member>;
    member: Member = null; // for the form
    
    constructor(
        private af: AngularFire,
        private route: ActivatedRoute,
        private router: Router,
        public dialogService: DialogService) {}

    ngOnInit() {
        console.log("*** MemberEditComponent#init");
        this.route.params
            .map(params => params['id'])
            .do( id => console.log("route changed to edit member id = "+id))
            .subscribe( id => {
                this.memberObj = this.af.database
                    .object('/members/'+id);
                this.memberObs = this.memberObj
                    .map( obj => new Member(obj) )
                    .do( mem => console.log("edit member",mem) )
                    .do( mem => this.member = mem )
                    .do( mem => this.gender = mem.sex=="m" ? "Male" : "Female" )
                    //.subscribe( console.log );
            });
   }

    onCancel(){
        // page action... navigate back to the show page for this user
        this.router.navigate(['/member', this.member.id]);
    }

    onSubmit(form) { 
        console.log("*** MemberEditComponent#submit",form);
        var sex = this.gender === "Male" ? "m" : "f";
        this.memberObj.update({ 
            sex: sex, // converted
            last: this.member.last_name, 
            first: this.member.first_name, 
            middle: this.member.middle_name, 
            description: this.member.description 
        });
        //return false; // ???
    }
    // save(newName: string) {
    //     // saves an entire new objec... be careful!!!
    //     //this.memberObj.set({ name: newName });
    // }
    // update() {
    //     console.log("*** MemberEditComponent#update");
    //     // use changes in member to update the firebase object
    //     this.memberObj.update({ description: this.member.description });
    // }
}
