import { Member } from './member';

// our events can be approximate so they may have any
// set of the day, month and year values... but may also
// simply have a string "around christmas"; where possible
// we construct an actual date object (why?)

export class Event {

    kind: string = ""; // birth, death, ...

    day: number = 0;
    year: number = 0;
    month: number = 0;
    date_str: string;
    date: Date;

    type?: string;
    notes?: string;
    place?: string;

    constructor(obj: any) {
        //console.log("event constructor...",obj);
        this.day      = obj && obj.day      ? +obj.day      : 0;
        this.year     = obj && obj.year     ? +obj.year     : 0;
        this.month    = obj && obj.month    ? +obj.month    : 0;
        this.kind     = obj && obj.event    ?  obj.event    : "error";
        this.date_str = obj && obj.date_str ?  obj.date_str : "";

        this.type = obj.type;
        this.notes = obj.notes;
        this.place = obj.place;

        if( this.day>0 && this.month>0 && this.year>0 ) { 
            this.date = new Date(this.year,this.month,this.day);
        }

        //console.log("event: date="+obj.date);
    }

    as_date_string() : string {
        if( this.date_str ) return this.date_str;
        if( this.month + this.day + this.year === 0 ) return "unknown";
        return this.month + "/" +this.day + "/" + this.year + " " + this.place;
    }
}
