import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs/Observable';

import { FirememService } from "../../services/firemem.service";

@Component({
    selector: "home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
  
    public firemems :Observable<any[]>;

    constructor(
        private ms: FirememService
    ) {
        console.log("HomeComponent#constructor");

        this.firemems = ms.members;
    }

    ngOnInit() {
        var currentTime = new Date();
        console.log("HomeComponent#ngOnInit: "+currentTime);
    }

    // protected() {
    //     console.log("HomeComponent#protected");
    //     this.apiService
    //         .get("/api")
    //         .subscribe(
    //             (data) => { this.response = data; },
    //             (error: Error) => {
    //                 this.error = error.message;
    //                 setTimeout(() => this.error = null, 4000)
    //             });
    // }
}
