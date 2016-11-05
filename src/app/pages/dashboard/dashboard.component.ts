import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

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

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


@Component({
  selector: 'kz-dashboard',
  templateUrl: "./dashboard.component.html",
  //styleUrls: ["./angular-calendar.css"]
})
export class DashboardComponent implements OnInit {

    profile: any = null;

    view: string = 'month';

    viewDate: Date = new Date();
  

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

  events: CalendarEvent[] = [];
  
//   events: CalendarEvent[] = [{
//     start: subDays(startOfDay(new Date()), 1),
//     end: addDays(new Date(), 1),
//     title: 'A 3 day event',
//     color: colors.red,
//     actions: this.actions
//   }, {
//     start: startOfDay(new Date()),
//     title: 'An event with no end date',
//     color: colors.yellow,
//     actions: this.actions
//   }, {
//     start: subDays(endOfMonth(new Date()), 3),
//     end: addDays(endOfMonth(new Date()), 3),
//     title: 'A long event that spans 2 months',
//     color: colors.blue
//   }, {
//     start: addHours(startOfDay(new Date()), 2),
//     end: new Date(),
//     title: 'A resizable event',
//     color: colors.yellow,
//     actions: this.actions,
//     resizable: {
//       beforeStart: true,
//       afterEnd: true
//     }
//   }];

  activeDayIsOpen: boolean = true;

    constructor( private profileService: DashboardService ) {}

    ngOnInit() { 
        //this.profile = this.profile || this.profileService.load_profile();
    }

}