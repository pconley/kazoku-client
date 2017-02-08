import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import {
  CalendarEvent,
  //CalendarEventAction,
  //CalendarEventTimesChangedEvent
} from 'angular-calendar'; 

import { Event          } from '../../models/event';
import { Member         } from '../../models/member';
import { EventService   } from '../../services/event.service';
import { FirememService } from '../../services/firemem.service';
import { CalendarItem   } from './calendar_item';

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
    viewYear : number = 2010;
    viewMonthStr: string = "";
    activeDayIsOpen: boolean = false;
    refresh: Subject<any> = new Subject();

    items         : CalendarItem[] = [];
    filteredItems : CalendarItem[] = [];
    holidays      : CalendarEvent[] = [
        { start: new Date(2010, 0, 1), title: 'New Year Day', color: colors.holiday },
        { start: new Date(2010, 1, 2), title: 'Groundhog Day', color: colors.holiday },
        { start: new Date(2010, 2,15), title: 'Ides of March', color: colors.holiday },
        { start: new Date(2010, 2,17), title: "St. Paddy's Day", color: colors.holiday },
        { start: new Date(2010,10,24), title: 'Thanksgiving', color: colors.holiday },
        { start: new Date(2010,11,25), title: 'Christmas',    color: colors.holiday },
    ];

    constructor( 
        private router : Router,
        private EventService: EventService,
        private FMS: FirememService,
    ) {}

    ngOnInit() { 
        console.log("DashViewCalComponent#init");
        this.FMS
            .members
            .do( members => console.log("init. members count = "+members.length) )
            .subscribe( members => {
                this.onLoad(this,members);  // extract the items from members 
                this.setViewThisMonth();        // start display on current month
                this.refresh.next();        // refresh the calendar view
            }, this.onError, this.onDone );
    }
    setViewThisMonth(): void { 
        var temp = new Date();
        temp.setDate(1);
        this.setViewDate( temp ); 
        this.activeDayIsOpen = true;
    }
    setViewDate(date: Date){
        //console.log(">>> set view date to ",date);
        this.viewDate = date;
        this.viewMonthStr = date.toLocaleString("en-us", { month: "long" });
        const new_year = date.getFullYear();
        if( this.viewYear != new_year ){
            // the view year is actually changing, so adjust all items
            this.viewYear = new_year;
            this.items.forEach( item => { item.start.setFullYear(new_year) });
        }
        const month = date.getMonth();
        this.filteredItems = this.items
            .filter( item => item.start.getMonth() == month )
            .sort( (a,b) => a.start.getDate()-b.start.getDate() );
        //console.log("filtered items...",this.filteredItems);
        this.refresh.next();
    }
    onLoad(that, members: Member[]){
        console.log(">>> onLoad year = "+this.viewYear);

        that.items.length = 0; // clear items
        Array.prototype.push.apply(that.items, that.holidays);

        members.forEach( member => {
            member.events.forEach( event => {
                //console.log( "--- event...",event);
                if( event.day > 0 && event.month > 0 ){
                    // the event is associated with a calenderable date 
                    let item = new CalendarItem(that.viewYear,event,member);
                    that.items.push( item );
                }
            });
        });
    }
    onError(error: Error){
        console.error(">>> DashViewCalComponent#onError",error);
        this.loading = false;
        this.items.length = 0;
        this.status = "Error: "+error.message;
    }
    onDone(){
        console.log(">>> DashViewCalComponent#onDone");
        this.loading = false;
        this.status = "Done";
    }
    changeViewMonth(inc): void { 
        var temp = this.viewDate;
        var month = temp.getMonth()+inc;
        temp.setDate( 1 );
        temp.setMonth( month );
        this.setViewDate( temp );
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
    get_holiday(year){
        
    }
}