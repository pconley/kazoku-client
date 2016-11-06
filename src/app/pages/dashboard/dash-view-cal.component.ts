import { Component, OnInit } from '@angular/core';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar'; 

import { EventService } from '../../services/event.service';
import { DashboardService } from '../../services/dashboard.service';

const colors: any = {
  red: { primary: '#ad2121', secondary: '#FAE3E3' },
  blue: { primary: '#1e90ff', secondary: '#D1E8FF' },
  yellow: { primary: '#e3bc08', secondary: '#FDF1BA' }
};

const months: string[] = ["January","February","March","April","May","Jun","July","August","September","October","November","December"];

@Component({
  selector: 'kz-dash-view-cal',
  templateUrl: "./dash-view-cal.component.html"
})
export class DashViewCalComponent implements OnInit {

    viewDate: Date = new Date();
    viewMonth: string = "";
    // start with active date open/closed
    activeDayIsOpen: boolean = false;

    actions: CalendarEventAction[] = [{
        label: '<i class="fa fa-fw fa-pencil"></i>',
        onClick: ({event}: {event: CalendarEvent}): void => {
            console.log('Edit event', event);
        }
    }, {
        label: '<i class="fa fa-fw fa-times"></i>',
        onClick: ({event}: {event: CalendarEvent}): void => {
            this.events = this.events.filter(iEvent => iEvent !== event);
        }
    }];

    events: CalendarEvent[] = [
        { start: new Date(2016,10,24), end: new Date(2016,10,25), title: 'TwoDays', color: colors.blue, actions: this.actions },
        { start: new Date(2016,11,25), title: 'Xmas', color: colors.blue, actions: this.actions }
    ];

    constructor( 
        private EventService: EventService,
        private dashboardService: DashboardService 
    ) {}

    ngOnInit() { 
        console.log("DashViewCalComponent#init");
    }

        setViewDate(date: Date){
        this.viewDate = date;
        this.viewMonth = months[date.getMonth()];
    }

    change(inc): void {
        var y = this.viewDate.getFullYear();
        var m = this.viewDate.getMonth();
        var d = this.viewDate.getDate();
        this.setViewDate( new Date(y,m+inc,d) );
        this.activeDayIsOpen = false;
    }

    increment(): void { this.change(+1); }
    decrement(): void { this.change(-1); }
    today(): void { 
        this.setViewDate( new Date() ); 
        this.activeDayIsOpen = true;

    }

    dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {
        console.log("--- day clicked  date = "+date+" events...",events);
        // do not jump to a new month if trying to change month
        if( date.getMonth() != this.viewDate.getMonth() ) return;
        this.setViewDate( date );
    }

    getDateAsString(date){
        var day = date.getDate();
        var month = date.toLocaleString("en-us", { month: "long" });
        var suffix = "th";
        if( day%10 === 1 && day !== 11 ) suffix = "st";
        if( day%10 === 2 && day !== 12 ) suffix = "nd";
        if( day%10 === 3 && day !== 13 ) suffix = "rd";
        // if( day === 11 ) suffix = "th";
        // if( day === 12 ) suffix = "th";
        // if( day === 13 ) suffix = "th";
        return month+" "+day+suffix;
    }
}