import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import {
  CalendarEvent,
  CalendarEventAction,
  //CalendarEventTimesChangedEvent
} from 'angular-calendar'; 

import { Event } from '../../models/event';
import { EventService } from '../../services/event.service';

const colors: any = {
  death:   { primary: '#ad2121', secondary: '#FAE3E3' }, // red
  birth:   { primary: '#1e90ff', secondary: '#D1E8FF' }, // blue
  holiday: { primary: '#e3bc08', secondary: '#FDF1BA' }  // yellow
};

class CalendarItem implements CalendarEvent {

    start: Date;
    title: string;
    color: any;

    event: Event;

    kind: string; // birth, death, etc.
    ordinal: string;  // 1st, 2nd, 3rd, ...

    constructor(year: number, event: any) {
        this.event = event;
        this.kind = event.kind ? event.kind : "holiday"; 
        this.ordinal = event.day + this.suffix(event.day);

        let fname = event.member.first_name;
        let lname = event.member.last_name;
        let range = event.member.display_range;
        this.title = `${fname} ${lname} ${range}`;
        this.color = event.kind == "death" ? colors.death : colors.birth;
        this.start = new Date(year,event.month-1,event.day);
    }

    suffix(n: number){
        // 11,12,13 are special cases, but it is
        // more efficient to have the broadest range
        // that includes these as the first test
        if( n >= 4 && n <= 20 ) return "th";
        var x = n % 10;
        if( x == 1  ) return "st";
        if( x == 2  ) return "nd";
        if( x == 3  ) return "rd";
        return "th";
    }
}


@Component({
  selector: 'kz-dashboard-page',
  templateUrl: "./dashboard.component.html"
})
export class DashboardComponent implements OnInit {

    status: string = "";
    loading: Boolean = false;
    viewDate: Date = new Date();
    viewMonth: string = "";
    activeDayIsOpen: boolean = false;
    refresh: Subject<any> = new Subject();
    //today_day: number = new Date().getDate();

    items: CalendarItem[] = [];
    holidays: CalendarEvent[] = [
        { start: new Date(2016,10,24), title: 'Thanksgiving', color: colors.holiday },
        { start: new Date(2016,11,25), title: 'Christmas',    color: colors.holiday },
        { start: new Date(2017, 1, 1), title: 'New Year Day', color: colors.holiday }
    ];

    //actions: CalendarEventAction[] = [
    // {   label: 'xxx',
    //     onClick: ({event}: {event: CalendarEvent}): void => {
    //         console.log('xxx event', event);
    //     }
    // }, 
    // {   label: 'yyy',
    //     onClick: ({event}: {event: CalendarEvent}): void => {
    //         console.log('yyy event', event);
    //         this.events = this.events.filter(iEvent => iEvent !== event);
    //     }
    // }
    //];

    constructor( 
        private router : Router,
        private EventService: EventService
    ) {}

    ngOnInit() { 
        console.log("DashViewCalComponent#init");
        this.today(); // starting display
    }

    today(): void { 
        this.setViewDate( new Date() ); 
        this.getEvents( this.viewDate );
        this.activeDayIsOpen = true;
    }

    setViewDate(date: Date){
        this.viewDate = date;
        this.viewMonth = date.toLocaleString("en-us", { month: "long" });
    }

    getEvents(date: Date){
        console.log("DashViewCalComponent#getEvents "+date);
        this.items.length = 0; // clear out existing events
        Array.prototype.push.apply(this.items, this.holidays);
        let display_year = date.getFullYear();
        this.EventService.getEvents(date.getMonth()+1)
            .subscribe(
                (events) => { 
                    console.log(">>> getEvents#loading. event count = "+events.length);
                    for (let event of events) {
                        let item = new CalendarItem(display_year,event);
                        //console.log(item);
                        this.items.push(item);
                    }
                    console.log(">>> loading. seventh event...",events[6]);
                    console.log(">>> loading. seventh item...",this.items[6]);
                    this.refresh.next(); // refresh the calendar view
                },
                (error: Error) => {
                    console.error(">>> DashViewCalComponent#getEvents error... ",error);
                    this.loading = false;
                    this.items.length = 0;
                    this.status = "Error: "+error.message;
                },
                () => { 
                    //console.log(">>> done loading");
                    this.loading = false;
                    this.status = "Done";
                }
            );
    }

    increment(): void { this.change(+1); }
    decrement(): void { this.change(-1); }

    change(inc): void {
        var y = this.viewDate.getFullYear();
        var m = this.viewDate.getMonth();
        var d = this.viewDate.getDate();
        this.setViewDate( new Date(y,m+inc,d) );
        this.getEvents( this.viewDate );
        this.activeDayIsOpen = false;
    }

    dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {
        console.log("--- day clicked  date = "+date+" events...",events);
        // do not jump to a new month if trying to change month
        if( date.getMonth() != this.viewDate.getMonth() ) return;
        this.setViewDate( date );
        this.activeDayIsOpen = true;
    }

    eventClicked(obj): void {
        console.log("--- event clicked. obj...",obj);
        // var event = obj.event;
        // console.log("--- event clicked. event...",event);
        // console.log("--- event clicked with title="+event.title);
        // var items = this.items.filter( (item) => item.title == event.title );
        // console.log("--- the matching item is...",items[0]);
        this.router.navigate(['/member', obj.member_id]);
    }

}