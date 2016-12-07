import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import {
  CalendarEvent,
  CalendarEventAction,
  //CalendarEventTimesChangedEvent
} from 'angular-calendar'; 

import { Event } from '../../models/event';
import { CalendarItem } from '../../models/calendar_item';
import { EventService } from '../../services/event.service';

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
    today_day: number = new Date().getDate();

    items: CalendarItem[] = [];
    calvents: CalendarEvent[] = [];
    holidays: CalendarEvent[] = [
        { start: new Date(2016,10,24), title: 'Thanksgiving', color: colors.holiday },
        { start: new Date(2016,11,25), title: 'Christmas', color: colors.holiday }
    ];

    actions: CalendarEventAction[] = [
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
        this.items.length = 0;
        this.calvents.length = 0; // clear out existing events
        Array.prototype.push.apply(this.calvents, this.holidays);
        let display_year = date.getFullYear();
        this.EventService.getEvents(date.getMonth()+1)
            .subscribe(
                (events) => { 
                    console.log(">>> getEvents#loading. event count = "+events.length);
                    for (let event of events) {
                        console.log(">>> getEvents#loading event...",event);
                        if( event.day == 0 ) continue; //skip zero day events
                        let fname = event.member.first_name;
                        let lname = event.member.last_name;
                        let range = event.member.range;
                        let title = `${fname} ${lname} ${range}`;
                        let color = event.kind == "death" ? colors.death : colors.birth;
                        let anniv = new Date(display_year,event.month,event.day);
                        let len = this.calvents.push({start: anniv, color: color, title: title, actions: this.actions});
                        let calvent = this.calvents[len-1]; // the calvent just added to the array
                        console.log(">>> getEvents#buil calvent...",calvent);
                        this.items.push( new CalendarItem({calvent: calvent, date: anniv, member_id: event.member.id, kind: event.kind}));
                    }
                    //console.log(">>> loading. first calvent = "+this.calvents[0].title);
                    //console.log(">>> loading. seventh event...",this.events[6]);
                    this.refresh.next(); // refresh the calendar view
                },
                (error: Error) => {
                    console.error(">>> DashViewCalComponent#getEvents error... ",error);
                    this.loading = false;
                    this.calvents.length = 0;
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

    build(event: Event, display_year: number): any {
        let fname = event.member.first_name;
        let lname = event.member.last_name;
        let range = event.member.range;
        let title = `${fname} ${lname} ${range}`;
        let color = event.kind == "death" ? colors.death : colors.birth;
        let anniv = new Date(display_year,event.month,event.day);
        return {start: anniv, color: color, title: title, actions: this.actions};
    }
 
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
        var event = obj.event;
        console.log("--- event clicked. event...",event);
        console.log("--- event clicked with title="+event.title);
        var items = this.items.filter( (item) => item.title == event.title );
        console.log("--- the matching item is...",items[0]);
        this.router.navigate(['/member', items[0].member_id]);
    }

}