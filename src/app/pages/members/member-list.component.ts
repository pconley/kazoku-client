import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AuthService } from "../../services/auth.service";
import { FirememService } from "../../services/firemem.service";

import { Member } from "../../models/member"

@Component({
    selector: "kz-members",
    templateUrl: "./member-list.component.html",
    styleUrls: [ "./member-list.component.css" ]
})
export class MemberListComponent implements OnInit {

    public members :Observable<Member[]>;
 
    imageWidth: number = 30;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: string = "";

    count: number = 0;
    status: string = '';
    loading: boolean = false;

    isListView: boolean = true;

    constructor(
        private router: Router, 
        private authService: AuthService,
        private fms: FirememService,
    ) {
        console.log("*** MemberListComponent#constructor")
    }

    ngOnInit(){ 
        console.log("*** MemberListComponent#OnInit")
        //this.loader(false); // do not force re-load of members

        this.members = this.fms.members;
    }

    previousMember: Member = null;
    onSelect(member: Member): void {
        var same = this.previousMember == member;
        console.log(">>> selected same="+same,member);
        if( same ) member.selected = !member.selected;
        else { 
            member.selected = true;
            if( this.previousMember ) this.previousMember.selected = false;
        }
        this.previousMember = member;

        this.router.navigate(['/member', member.id]);
    }

    refresh(){ this.loader(true); }

    loader(force: boolean){
        console.log("--- MemberListComponent#loader force="+force);

        this.count = 0; 
        this.loading = true;
        this.status = "Loading";
        // NOTE: getMembers will use the cached results (if they exist)
        // unless we set the forced argument (passed in from above); also
        // getMembers might return all the data in one emit or over several
        // this.xemberService.getMembers(force)
        //     .subscribe(
        //         (data) => { 
        //             //console.log("*** loading. records = "+data.length);
        //             Array.prototype.push.apply(this.members,data);
        //             //this.count = this.members.length;
        //         },
        //         (error: Error) => {
        //             console.log("*** error");
        //             this.count = 0;
        //             this.loading = false;
        //             this.status = "Error: "+error.message;
        //         },
        //         () => { 
        //             console.log("*** done");
        //             this.loading = false;
        //             this.status = "Done";
        //         }
        //     );
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    onRatingClicked(msg : string){
        console.log('list#onRatingClicked '+msg);
    }

}
