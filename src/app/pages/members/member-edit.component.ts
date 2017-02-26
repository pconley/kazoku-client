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
    //wasSubmitted = false;
    memberFOO: FirebaseObjectObservable<Member>;
    //memberObs: Observable<Member>;
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
                this.memberFOO = this.af.database
                    .object('/members/'+id);
                this.memberFOO
                    //.do( foo => console.log(typeof(foo),foo) )
                    .map<Member>( foo => new Member(foo) )
                    .subscribe( mem => {
                        console.log("edit member",mem);
                        this.member = mem;
                        this.gender = mem.sex=="m" ? "Male" : "Female"
                    });
            });
   }

    onCancel(pristine){
        console.log("pristine",pristine);
        if( pristine === false ){
            // there were changes made on the page, so...
            let answer = this.dialogService.check('Discard Member Changes?');
            if( answer === false ) return; // no action
        }
        // page action... navigate back to the show page for this user
        this.router.navigate(['/member', this.member.id]);
    }

    onSubmit(group) { 
        let form = group.form;
        console.log("*** onSUBMIT. form...",form,form.getRawValue());
        var sex = this.gender === "Male" ? "m" : "f";
        var data = { 
            sex: sex, // converted
            last: this.member.last_name, 
            first: this.member.first_name, 
            middle: this.member.middle_name, 
            description: this.member.description 
        }
        this.memberFOO.update(data);
        form.markAsPristine();
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
