import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import {
  CalendarEvent,
  //CalendarEventAction,
  //CalendarEventTimesChangedEvent
} from 'angular-calendar'; 

import { Event          } from '../../models/event';
import { Member         } from '../../models/member';
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

    viewDateSubject : Subject<Date> = new Subject<Date>();

    currentDate : Date = new Date(2010,1,1);
    currMonthStr : string = "";
    activeDayIsOpen : boolean = false;
    refresh : Subject<any> = new Subject<any>();

    items       : CalendarItem[] = []; // for main calendar
    itemsToday  : CalendarItem[] = []; // for "today in history"
    itemsMonth  : CalendarItem[] = []; // for month-only listview
    
    constructor( 
        private router : Router,
        private FMS: FirememService,
    ) {}

    ngOnInit() { 
        console.log("DashViewCalComponent#init");
        this.viewDateSubject.subscribe( d => this.onViewDateChanged(d) );
        this.FMS.members.subscribe( members => this.onLoad(members), this.onError, this.onDone );
    }
    onLoad(members){
        console.log("dashboard. onLoad. members count = "+members.length)
        const today = (new Date);
        const day   = today.getDate();
        const month = today.getMonth();

        let items = this.extractItems(members);
        this.items.length = 0; // clear items; to set
        Array.prototype.push.apply(this.items, items.filter(this.isCustom));
        Array.prototype.push.apply(this.items, this.get_holidays(this.currentDate));
        this.itemsToday = this.items
            .filter( this.forDay( day ) )
            .filter( this.forMonth( month ) );
        this.viewDateSubject.next( today );
    }    
    onError(error: Error){
        console.error("dashboard. onError",error);
        this.items.length = 0;
    }
    onDone(){
        console.error("dashboard. onDone");
    }
    onViewDateChanged(new_date: Date){
        console.log(">>> view date changed",this.currentDate,new_date);
        const new_year = new_date.getFullYear();
        const new_month = new_date.getMonth();

        if( this.currentDate.getFullYear() != new_year ){
            console.log(">>> year changed",this.currentDate.getFullYear(),new_year)
            // the year is changing, so adjust all items to have the
            // new year since the items are really the anniveries of events
            // also, we need to reset the floating holidays to match the new year

            this.items.forEach( 
                item => { 
                    item.start.setFullYear(new_year);
                    if( item.title == "Thanksgiving" ){
                        item.start = this.get_turkey_day(new_year);
                    }
            });
            //Array.prototype.push.apply(this.items, this.get_holidays(new_year));
        } 

        this.itemsMonth = this.items
            .filter( this.forMonth(new_month) )
            .filter( this.isCustom )
            .sort( (a,b) => a.start.getDate()-b.start.getDate() );

        this.currMonthStr = new_date.toLocaleString("en-us", { month: "long" });
        this.currentDate = new_date;    // used by html control
        this.refresh.next();            // refresh html view
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
    //
    // actions from the html component
    //
    setViewThisMonth(): void { 
        var temp = new Date();
        temp.setDate(1);
        this.viewDateSubject.next( temp );
        this.activeDayIsOpen = true;
    }
    changeViewMonth(inc): void { 
        var next = this.addMonth(this.currentDate,inc);
        this.viewDateSubject.next( next );
        this.activeDayIsOpen = false;
    }
    addMonth(date : Date, inc : number){
        // +/- increment months and change to the first of
        // of the month to be sure that the date is valid
        var year = date.getFullYear();
        var month = date.getMonth()+inc;
        return new Date(year,month,1);
    }
    dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {
        console.log("--- day clicked  date = "+date+" events...",events);
        // we only need to take action if the month is changing
        if( date.getMonth() != this.currentDate.getMonth() ) return;
        this.viewDateSubject.next( date );
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
    get_holidays(date : Date){
        let year = date.getFullYear();     
        // a set of static holidays on the same date each year
        let holidays: CalendarEvent[] = [
            { start: new Date(year, 0, 1), title: 'New Year Day', color: colors.holiday },
            { start: new Date(year, 1, 2), title: 'Groundhog Day', color: colors.holiday },
            { start: new Date(year, 2,15), title: 'Ides of March', color: colors.holiday },
            { start: new Date(year, 2,17), title: "St. Paddy's Day", color: colors.holiday },
            { start: new Date(year,11,25), title: 'Christmas',    color: colors.holiday },
        ];
        // but there are also floating holidays that change date each year
        holidays.push(this.get_thanksgiving(year))
        return holidays;
    }
    get_thanksgiving(year: number) {
        return { start: this.get_turkey_day(year), title: 'Thanksgiving', color: colors.holiday };
    }
    get_turkey_day(year){
        let date;
        let i = 22;
        // first Thursday on or affter the 22n of November
        while( (date = new Date(year,10,i++)).getDay() != 4 );
        console.log("turkey day",date);
        return date;
    }
}