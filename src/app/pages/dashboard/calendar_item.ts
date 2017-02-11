// we are using a 3rd party calendar that uses the "CalendarEvent", but
// we have extended that object/interface with our own calendar item so
// that we can include additional info ... primarily the memeber id so 
// that we can use the id to jump to the person when the event is clicked
// note that we also use addtional info in the secondary list display

import { Event         } from '../../models/event';
import { Member        } from '../../models/member';
import { CalendarEvent } from 'angular-calendar'; 

export class CalendarItem implements CalendarEvent {
    // these props are for the interface
    start: Date;
    title: string;
    color: any;
    // the remainder are custom props
    kind: string;     // birth, death, etc.
    ordinal: string;  // 1st, 2nd, 3rd, ...

    colors: any = {
        death:   { primary: '#ad2121', secondary: '#FAE3E3' }, // red
        birth:   { primary: '#1e90ff', secondary: '#D1E8FF' }, // blue
        holiday: { primary: '#e3bc08', secondary: '#FDF1BA' }  // yellow
    };

    // our item needs the year of the display calendar, not the actual date of the event 
    // so that it will display in the current calendar... really the anniversary

    constructor(private year: number, public event: Event, private member: Member) {

        this.kind = event.kind ? event.kind : "holiday"; 
        this.ordinal = event.day + this.suffix(event.day);

        const fname = member.first_name;
        const lname = member.last_name;
        const b_part = member.birth ? member.birth.year : "?";
        const d_part = member.death ? " - "+member.death.year : "";
        let range = "("+b_part+d_part+")";

        this.title = `${fname} ${lname} ${range}`;
        this.color = event.kind == "deat" ? this.colors.death : this.colors.birth;

        this.start = new Date(year,event.month-1,event.day);
        //if( event.month == 2 ) console.log("CI Constructor",this.title,year,event.month,event.day,this.start);
    }

    suffix(n: number){
        // 11,12,13 are special cases, but it is
        // more efficient to have the broadest range
        // that includes these as the first test
        if( n >= 4 && n <= 20 ) return "th";
        var x = n % 10;
        if( x == 1  ) return "st";
        if( x == 2  ) return "nd";
        if( x == 3  ) return "rd";
        return "th";
    }
}