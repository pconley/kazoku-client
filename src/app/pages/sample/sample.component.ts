import { Component, OnInit } from "@angular/core";

@Component({
    selector: "kz-sample",
    templateUrl: "./sample.component.html"
})
export class SampleComponent implements OnInit {

    progress: number = 0;

    foods: any[] = [
        {name: 'Pizza', rating: 'Excellent'},
        {name: 'Burritos', rating: 'Great'},
        {name: 'French fries', rating: 'Pretty good'},
    ];
    
    constructor() {
        console.log("SampleComponent#constructor");
    }

    ngOnInit() {
        console.log("SampleComponent#init");

        // continuously update the value for the progress-bar on an interval.
        setInterval(() => {
            this.progress = (this.progress + Math.floor(Math.random() * 4) + 1) % 100;
        }, 200);
    }
}
