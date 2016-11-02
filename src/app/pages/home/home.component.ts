import { Component, OnInit } from "@angular/core";

import { ApiService } from "../../services/api.service";
import { EventService } from "../../services/event.service";

@Component({
    selector: "home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    error: string;
    response: {};
    dummy: number = 7;

    constructor(private apiService: ApiService) {
        console.log("HomeComponent#constructor: "+this.dummy);
    }

    ngOnInit() {
        var currentTime = new Date();
        console.log("HomeComponent#ngOnInit: "+currentTime);
    }

    protected() {
        console.log("HomeComponent#protected");
        this.apiService
            .get("/api")
            .subscribe(
                (data) => { this.response = data; },
                (error: Error) => {
                    this.error = error.message;
                    setTimeout(() => this.error = null, 4000)
                });
    }
}
