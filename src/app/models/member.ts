export interface IMember {
    id: number;
    first_name: string;
    last_name: string;
    key: string;
    starRating: number;
    selected: boolean;
    birth?: any;
    death?: any;
    description: string;
    parents?: IMember[];
}

export class Event {
    day: number;
    month: number;
    year: number;
    location: string;

    constructor(obj: any) {
        this.day = obj && obj.day ? +obj.day : 0;
        this.year = obj && obj.year ? +obj.year : 0;
        this.month = obj && obj.month ? +obj.month : 0;
        this.location = obj && obj.location ? obj.location : "";
    }
}

export class Member {
    id: number;
    key: string;
    first_name: string;
    last_name: string;
    description: string;
    birth: any;
    death: any;
    parents: IMember[];

    constructor(obj: any) {
        this.id = obj.id;
        this.key = obj.key;
        this.last_name = obj.last_name;
        this.first_name = obj.first_name;
        this.description = obj.description;
        this.birth = new Event(obj.birth);
        this.death = new Event(obj.death);
    }
}
