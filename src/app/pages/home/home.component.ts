import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { trace } from '../../utilities/trace';

@Component({
    selector: "home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
  
    constructor() {
        trace.log("HomeComponent#constructor");
    }

    ngOnInit() {
        trace.log("HomeComponent#init: ");
    }
}
