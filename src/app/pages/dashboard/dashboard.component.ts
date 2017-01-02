import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import {
  CalendarEvent,
  //CalendarEventAction,
  //CalendarEventTimesChangedEvent
} from 'angular-calendar'; 

import { Event } from '../../models/event';
import { EventService } from '../../services/event.service';
import { CalendarItem } from './calendar_item';

const colors: any = {
  death:   { primary: '#ad2121', secondary: '#FAE3E3' }, // red
  birth:   { primary: '#1e90ff', secondary: '#D1E8FF' }, // blue
  holiday: { primary: '#e3bc08', secondary: '#FDF1BA' }  // yellow
};

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
        var item = obj.event;
        console.log("--- event clicked. calendar item...",item);
        var event = item.event;
        console.log("--- event clicked. server event...",event);
        // console.log("--- event clicked with title="+event.title);
        // var items = this.items.filter( (item) => item.title == event.title );
        // console.log("--- the matching item is...",items[0]);
        this.router.navigate(['/member', event.member.id]);
    }

}