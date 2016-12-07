import { Member } from './member';

export class Event {
    day: number = 0;
    year: number = 0;
    month: number = 0;
    kind: string = "";
    member: Member;
    location: string = "";

    constructor(obj: any) {
        this.day = obj && obj.day ? +obj.day : 0;
        this.year = obj && obj.year ? +obj.year : 0;
        this.month = obj && obj.month ? +obj.month : 0;
        this.kind = obj.kind; // required
        this.member = new Member(obj.member); // required
        this.location = obj && obj.location ? obj.location : "";
    }

    to_string() : string {
        if( this.month + this.day + this.year === 0 ) return "none";
        return this.month + "/" +this.day + "/" + this.year + " " + this.location;
    }
}
