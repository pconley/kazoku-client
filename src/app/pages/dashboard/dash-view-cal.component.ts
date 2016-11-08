import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import {
  CalendarEvent,
  CalendarEventAction,
  //CalendarEventTimesChangedEvent
} from 'angular-calendar'; 

import { EventService } from '../../services/event.service';

const colors: any = {
  death:   { primary: '#ad2121', secondary: '#FAE3E3' }, // red
  birth:   { primary: '#1e90ff', secondary: '#D1E8FF' }, // blue
  holiday: { primary: '#e3bc08', secondary: '#FDF1BA' }  // yellow
};

@Component({
  selector: 'kz-dash-view-cal',
  templateUrl: "./dash-view-cal.component.html"
})
export class DashViewCalComponent implements OnInit {

    status: string = "";
    loading: Boolean = false;
    viewDate: Date = new Date();
    viewMonth: string = "";
    activeDayIsOpen: boolean = false;
    refresh: Subject<any> = new Subject();

    items: any[] = [];
    events: CalendarEvent[] = [];
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
        this.events.length = 0; // clear out existing events
        Array.prototype.push.apply(this.events, this.holidays);
        let display_year = date.getFullYear();
        this.EventService.getEvents(date.getMonth()+1)
            .subscribe(
                (data) => { 
                    //console.log(">>> loading. event count = "+data.length);
                    for (let datum of data) {
                        //console.log(">>> member...",datum['member']);
                        let event_day = datum['day']+0;
                        if( event_day == 0 ) continue; //skip zeros
                        let event_year = datum['year']+0;
                        let anniv = new Date(display_year,datum['month']-1,event_day);
                        let fname = datum['member']['first_name'];
                        let lname = datum['member']['last_name'];
                        let range = datum['member']['display_range'];
                        let title = `${fname} ${lname} ${range}`;
                        let color = datum['kind'] == "death" ? colors.death : colors.birth;
                        this.items.push({day: event_day, kind: datum['kind'], title: title});
                        this.events.push({start: anniv, color: color, 
                            title: title, actions: this.actions});
                    }
                    //console.log(">>> loading. first event...",this.events[0]);
                    //console.log(">>> loading. seventh event...",this.events[6]);
                    this.refresh.next(); // refresh the calendar view
                },
                (error: Error) => {
                    console.log(">>> error "+ error.message);
                    this.events = [];
                    this.loading = false;
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
}