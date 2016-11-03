import { Component, OnInit } from "@angular/core";

import { ProfileService } from "../../services/profile.service";

@Component({
    selector: "kz-profile",
    templateUrl: "./profile.component.html"
})
export class ProfileComponent implements OnInit {
    
    dummy: number = 999;
    profile: any = null;

    constructor( private profileService: ProfileService ) {}

    ngOnInit() {
        this.profile = this.profile || this.profileService.load_profile();
        console.log("*** ProfileComponent#init profile...",this.profile);
    }
}