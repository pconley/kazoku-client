import { Component, OnInit } from "@angular/core";

import { ApiService } from "../../services/api.service";
import { EventService } from "../../services/event.service";

@Component({
    selector: "kz-profile",
    templateUrl: "./profile.component.html"
})
export class ProfileComponent implements OnInit {
    
    dummy: number = 999;

    constructor(private apiService: ApiService) {
        console.log("ProfileComponent#constructor: "+this.dummy);
    }

    ngOnInit() {
        var currentTime = new Date();
        console.log("ProfileComponent#ngOnInit: "+currentTime);
    }
}
