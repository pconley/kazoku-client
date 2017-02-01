import { Member } from './member';

// our events can be approximate so they may have any
// set of the day, month and year values... but may also
// simply have a string "around christmas"; where possible
// we construct an actual date object (why?)

export class Event {
    day: number = 0;
    year: number = 0;
    month: number = 0;
    kind: string = "";
    location: string = "";
    date_str: string;
    date: Date;

    constructor(obj: any) {
        //console.log("event constructor...",obj);
        this.day      = obj && obj.day      ? +obj.day      : 0;
        this.year     = obj && obj.year     ? +obj.year     : 0;
        this.month    = obj && obj.month    ? +obj.month    : 0;
        this.kind     = obj && obj.kind     ?  obj.kind     : "error";
        this.location = obj && obj.location ?  obj.location : "";
        this.date_str = obj && obj.date_str ?  obj.date_str : "";

        try { 
            this.date = new Date(this.year,this.month,this.day);
        } catch(e) {
            // failure IS an option :-)
        }

        //console.log("event: date="+obj.date);
    }

    as_date_string() : string {
        if( this.date_str ) return this.date_str;
        if( this.month + this.day + this.year === 0 ) return "unknown";
        return this.month + "/" +this.day + "/" + this.year + " " + this.location;
    }
}
