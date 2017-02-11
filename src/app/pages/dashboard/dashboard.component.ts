import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import {
  CalendarEvent,
  //CalendarEventAction,
  //CalendarEventTimesChangedEvent
} from 'angular-calendar'; 

import { Event          } from '../../models/event';
import { Member         } from '../../models/member';
//import { EventService   } from '../../services/event.service';
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

    viewDate: Date = new Date();
    viewYear : number = 2010;
    viewMonthStr: string = "";
    activeDayIsOpen: boolean = false;
    refresh: Subject<any> = new Subject();

    items       : CalendarItem[] = []; // all for the calendar element
    itemsCustom : CalendarItem[] = []; // without any holidays
    itemsToday  : CalendarItem[] = []; // for "today"
    itemsMonth  : CalendarItem[] = []; // for listview
    
    constructor( 
        private router : Router,
        //private EventService: EventService,
        private FMS: FirememService,
    ) {}

    ngOnInit() { 
        //var that = this;
        console.log("DashViewCalComponent#init");
        const today = (new Date);
        const day   = today.getDate();
        const month = today.getMonth();
        this.FMS
            .members
            .do( members => console.log("init. members count = "+members.length) )
            .subscribe( members => {
                let items = this.extractItems(members);
                this.items.length = 0; // clear items; to set
                Array.prototype.push.apply(this.items, items.filter(this.isCustom));
                this.itemsToday = this.items
                    .filter( this.forDay( day ) )
                    .filter( this.forMonth( month ) );
                Array.prototype.push.apply(this.items, this.get_holidays(2017));
                this.setViewThisMonth();      // start display on current month
            }, this.onError, this.onDone );
    }
    setViewThisMonth(): void { 
        var temp = new Date();
        temp.setDate(1);
        this.setViewDate( temp ); 
        this.activeDayIsOpen = true;
    }
    setViewDate(in_date: Date){
        const in_year = in_date.getFullYear();
        const in_month = in_date.getMonth();

        console.log(">>> set view date to ",in_date);
        this.viewDate = in_date;
        this.viewMonthStr = in_date.toLocaleString("en-us", { month: "long" });
        if( this.viewYear != in_year ){
            // the view year is actually changing, so adjust all items
            this.viewYear = in_year;
            this.items.forEach( item => { item.start.setFullYear(in_year) });
        } 

        this.itemsCustom = this.items
            .filter( this.isCustom )
            .sort( (a,b) => a.start.getDate()-b.start.getDate() );

        this.itemsMonth = this.itemsCustom.filter( this.forMonth(in_month) );


        //console.log("filtered items...",this.filteredItems);
        this.refresh.next();
    }
    isCustom(item: CalendarItem){
        return item.kind == 'birt' || item.kind == 'deat'
    }
    forMonth(month: number): (item: CalendarItem) => boolean {
        return function(i: CalendarItem): boolean {return i.start.getMonth() == month; }
    }
    forDay(day: number): (item: CalendarItem) => boolean {
        return function(i: CalendarItem): boolean {return i.start.getDate() == day; }
    }
    extractItems(members: Member[]) : CalendarItem[] {
        let items = members.reduce( (acc,member) => {
            let xs = member.events
                    .filter( e => e.day > 0 && e.month > 0 )
                    .map( e => new CalendarItem(2017,e,member));
            Array.prototype.push.apply(acc,xs);
            return acc;
        }, []);
        console.log("extract",items);
        return items;
    }
    onError(error: Error){
        console.error(">>> DashViewCalComponent#onError",error);
        this.items.length = 0;
    }
    onDone(){
        console.error(">>> DashViewCalComponent#onDone");
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
        // we only need to take action if the month is changing
        if( date.getMonth() != this.viewDate.getMonth() ) return;
        this.setViewDate( date );
        this.activeDayIsOpen = true;
    }
    eventClicked(obj): void {
        console.log("--- event clicked. obj...",obj);
        var item = obj.event;
        //console.log("--- event clicked. calendar item...",item);
        //var event = item.event;
        //console.log("--- event clicked. server event...",event);
        // console.log("--- event clicked with title="+event.title);
        // var items = this.items.filter( (item) => item.title == event.title );
        // console.log("--- the matching item is...",items[0]);
        this.router.navigate(['/member', item.member.id]);
    }
    get_holidays(year){

        // TODO: not all holidays have a fixed date, so it depends on the year
        // perhaps we need two types... fixed and floating holidays... or delete
        // and set them when the display year changes

        let holidays: CalendarEvent[] = [
            { start: new Date(2010, 0, 1), title: 'New Year Day', color: colors.holiday },
            { start: new Date(2010, 1, 2), title: 'Groundhog Day', color: colors.holiday },
            { start: new Date(2010, 2,15), title: 'Ides of March', color: colors.holiday },
            { start: new Date(2010, 2,17), title: "St. Paddy's Day", color: colors.holiday },
            { start: new Date(2010,10,24), title: 'Thanksgiving', color: colors.holiday },
            { start: new Date(2010,11,25), title: 'Christmas',    color: colors.holiday },
        ];
        return holidays;
    }
}