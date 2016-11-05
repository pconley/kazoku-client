import { Component, OnInit } from '@angular/core';

// import {
//   startOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,
//   addWeeks,subWeeks,addMonths,subMonths,addHours
// } from 'date-fns';

import { Subject } from 'rxjs/Subject';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar'; 

import { DashboardService } from '../../services/dashboard.service';

const colors: any = {
  red: { primary: '#ad2121', secondary: '#FAE3E3' },
  blue: { primary: '#1e90ff', secondary: '#D1E8FF' },
  yellow: { primary: '#e3bc08', secondary: '#FDF1BA' }
};

const months: string[] = ["January","February","March","April","May","Jun","July","August","September","October","November","December"];

@Component({
  selector: 'kz-dashboard',
  templateUrl: "./dashboard.component.html"
})
export class DashboardComponent implements OnInit {

    profile: any = null;

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

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    { start: new Date(), title: 'Today', color: colors.red },
    { start: new Date(2016,10,24), end: new Date(2016,10,25), title: 'TwoDays', color: colors.blue, actions: this.actions },
    { start: new Date(2016,11,25), title: 'Xmas', color: colors.blue, actions: this.actions }
  ];
  
    constructor( private profileService: DashboardService ) {
        this.today(); // initial view is today
    }

    ngOnInit() { 
        //this.profile = this.profile || this.profileService.load_profile();
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

}