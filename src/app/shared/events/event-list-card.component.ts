//
// displays a list of events as a card with a title
// usage: 
//      <kz-event-list-card title="Event" [events]='member.events' ></kz-event-list-card>
//

import { Component, OnChanges, Input } from '@angular/core';
//import { FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'kz-event-list-card',
  template: `<md-card>
    <h4>{{title}}</h4>
    <ul>
        <li *ngFor='let event of events'>
            {{event | event }}  
            <a href="#" (click)="onEventClick()">edit</a>  
            <a href="#" (click)="onEventClick()">delete</a>  
        </li>
    </ul>
    <a href="#" (click)="onEventClick()" >add event</a>  
    </md-card>`
})

export class EventListCardComponent implements OnChanges {

    @Input() title: string = "loading..";
    @Input() events: any[] = [];

    constructor() {}

    ngOnChanges(): void {
        //console.log("card: showlast = "+this.showlast);
        // const s_last = this.showlast.toUpperCase();
        // this.withlast = s_last == "T" || s_last == "TRUE"  ;
        // const s_date = this.showdate.toUpperCase();
        // this.withdate = s_date == "T" || s_date == "TRUE"  ;
    }

    onEventClick(){ alert("not yet implemented"); return false; }

}