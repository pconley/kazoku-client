// we are using a 3rd party calendar that uses the "CalendarEvent", but
// we have extended that object/interface with our own calendar item so
// that we can include additional info ... promarily the memeber id so 
// that we can use the id to jump to the person when the event is clicked
// note that we also use addtional info in the secondary list display

import { Event } from '../../models/event';
import { CalendarEvent } from 'angular-calendar'; 

export class CalendarItem implements CalendarEvent {
    // these props are for the interface
    start: Date;
    title: string;
    color: any;
    // the remainder are custom props
    event: Event;     // Server Event
    kind: string;     // birth, death, etc.
    ordinal: string;  // 1st, 2nd, 3rd, ...

    colors: any = {
        death:   { primary: '#ad2121', secondary: '#FAE3E3' }, // red
        birth:   { primary: '#1e90ff', secondary: '#D1E8FF' }, // blue
        holiday: { primary: '#e3bc08', secondary: '#FDF1BA' }  // yellow
    };

    // our item needs the year of the display calendar, not the
    // actual date of the event so it will display... really the
    // anniversary of the event!

    constructor(year: number, event: any) {
        this.event = event;
        this.kind = event.kind ? event.kind : "holiday"; 
        this.ordinal = event.day + this.suffix(event.day);

        let fname = event.member.first_name;
        let lname = event.member.last_name;
        let range = event.member.display_range;
        this.title = `${fname} ${lname} ${range}`;
        this.color = event.kind == "death" ? this.colors.death : this.colors.birth;
        this.start = new Date(year,event.month-1,event.day);
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