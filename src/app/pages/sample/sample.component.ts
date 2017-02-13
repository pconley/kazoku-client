import { Component, OnInit } from "@angular/core";

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
    selector: "kz-sample",
    templateUrl: "./sample.component.html"
})
export class SampleComponent implements OnInit {

    progress: number = 0;

    foods: any[] ;

    items: FirebaseListObservable<any[]>;

    constructor(af: AngularFire) {
        console.log("SampleComponent#constructor");

        this.items = af.database.list('/books');

        this.foods = [
            {name: 'Pizza', rating: 'Excellent'},
            {name: 'Burritos', rating: 'Great'},
            {name: 'French fries', rating: 'Pretty good'}
        ];

        //af.database.object()
    }

    ngOnInit() {
        console.log("SampleComponent#init");

        // continuously update the value for the progress-bar on an interval.
        setInterval(() => {
            this.progress = (this.progress + Math.floor(Math.random() * 4) + 1) % 100;
        }, 200);


    }

    add_book(){

    

        console.log("add book");
        var data = { key: "my key 123", id: "P-234", author: "mike", title: "green mark" }
        this.items
            .push(data)
            .then((item) => { console.log("book key = "+item.key); });
    }
}
