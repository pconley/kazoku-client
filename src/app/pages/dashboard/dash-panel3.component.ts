import { Component, OnInit, Input } from '@angular/core';

import { CalendarDayComponent } from '../../components/calendar/calendar-day.component';

@Component({
  selector: 'kz-dash-panel3',
  templateUrl: "./dash-panel3.component.html",
  //directives: [ CalendarDayComponent ]
})
export class DashPanelThreeComponent implements OnInit {

    @Input()
    title:String;

    month: string = "error";
    days: any[] = [];
    weeks: any[] = [];
    hdrs: string[] = ["Sunday","Montag","Tue","Weds","Thor's Day","Frietag","Saturn"]
    birthdays: any[] = [];

    constructor() {}

    ngOnInit() { 
        console.log("DashPanelTwoComponent#init");

        var today = new Date();
        this.month = today.toLocaleString("en-us", { month: "long" });
        this.birthdays = []; //this.dashboardService.getBirthdays(today.getMonth());

        this.days = [];
        this.weeks = [];

        let week = [];
        let view_days = this.getMonthViewDays(today);
        //console.log("view days...",view_days);
        let count: number = 1;
        for( let day of this.getMonthViewDays(today) ){
            let names = this.getNames(this.birthdays,day);
            let text = names.join("; ");
            let obj = {day: day.getDate(), name: text, names: names};
            this.days.push( obj );
            week.push( obj );
            if( count == 7 ){
                this.weeks.push( week );
                week = [];
                count = 0;
            }
            count++;
        }
    }

    getNames(events,day){
        var names = [];
        //console.log("day ... "+day);
        for( let event of events ){
            if( event["day"] == day.getDate() && event["month"] == day.getMonth() ) 
                names.push(event["name"]);
        }
        return names;
    }

    getMonthViewDays(date: Date): Date[] {

        var days: Date[] = []; // returned

        var year = date.getFullYear();
        var month = date.getMonth();
        var the_first = new Date(year,month,1);
        // the month starts on a week day where
        // weekday >> 0 == Sunday; 1 == Monday, etc.
        var weekday: number = the_first.getDay();
        // so, the first week starts on this number
        var index = 1-weekday; // 0 >> 1; 1 >> 0
        var ended = false;
        // build up the weeks until month ends
        // with a failsafe of no more than N weeks
        for(var w=0; w<7 && !ended; w++ ){
            for(var i=0; i<7; i++ ){
                let current = new Date(year,month,index++);
                //console.log(index+" >> "+current);
                days.push( current );
                // month has ended if we see a one as day
                let curr_day = current.getDate(); 
                ended = ended || w>0 && curr_day == 1;
            }
        }
        return days;
    }
}