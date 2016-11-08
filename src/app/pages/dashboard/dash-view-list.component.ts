import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'kz-dash-view-list',
  templateUrl: "./dash-view-list.component.html"
})
export class DashViewListComponent implements OnInit {

    month: string = "error";

    loading: boolean = false;
    status: string = null;
    events: any[] = [];

    constructor( 
        private EventService: EventService
    ) {}

    ngOnInit() { 
        console.log("*** DashViewListComponent#init");

        var today = new Date();
        this.month = today.toLocaleString("en-us", { month: "long" });

        this.EventService.getEvents(today.getMonth()+1)
            .subscribe(
                (data) => { 
                    // push in case the data come back in chunks
                    Array.prototype.push.apply(this.events,data);
                    console.log(">>> loading. event count = "+this.events.length);
                    console.log(">>> loading. first event...",this.events[0]);
                },
                (error: Error) => {
                    console.log(">>> error "+ error.message);
                    this.events = [];
                    this.loading = false;
                    this.status = "Error: "+error.message;
                },
                () => { 
                    console.log(">>> done loading");
                    this.loading = false;
                    this.status = "Done";
                }
            );
    }
}