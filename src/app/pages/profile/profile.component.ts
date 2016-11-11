import { Component, OnInit } from "@angular/core";

import { ProfileService } from "../../services/profile.service";

@Component({
    selector: "kz-profile",
    templateUrl: "./profile.component.html"
})
export class ProfileComponent implements OnInit {
    
    profile: any = null;
    usermeta: any = {};
    friends: number = null;
    location: string = null;
    description: string = null;

    constructor( private profileService: ProfileService ) {}

    ngOnInit() {
        this.profile = this.profile || this.profileService.load_profile();
        console.log("*** ProfileComponent#init profile...",this.profile);
        this.usermeta = this.profile.user_metadata || {};
        this.friends = this.usermeta.friends || null;
        this.location = this.usermeta.location || null;
        this.description = this.usermeta.description || null;
    }

    alert(msg){
        // this is a dummy function for a couple of fake buttons
        // on the profile page
        alert(msg);
    }
}