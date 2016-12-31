export class CalendarItem {

    day: number = 0;
    year: number = 0;
    month: number = 0;
    member_id: number;
    kind: string; // birth, death, etc.
    title: string; // displayed string
    ordinal: string;  // 1st, 2nd, 3rd, ...

    constructor(obj: any) {
        this.day = obj && obj.event ? +obj.event.day : 0;
        this.month = obj && obj.event ? +obj.event.month : 0;
        this.year = obj && obj.event ? +obj.event.year : 0;

        this.member_id = +obj.member_id; // required
        this.kind = obj.kind; // required
        this.title = obj.title; // required
        this.ordinal = this.day + this.suffix(this.day);
    }

    // to_string() : string {
    //     if( this.month + this.day + this.year === 0 ) return "none";
    //     return this.month + "/" +this.day + "/" + this.year + " " + this.location;
    // }

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