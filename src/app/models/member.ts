import { Event } from './event';

export class Member {
    id: string; 
    key: string;
    last_name: string;
    first_name: string;
    middle_name: string;
    description: string;
    events: Event[];
    selected: boolean;
    birth: Event;
    death: Event;
    sex: string;
    image: string;
    famc: string;
    fams: string[];
    raw: string; // the raw json used to create this object

    constructor(obj: any) {
        if( !obj ) return; // no action

        this.raw = JSON.stringify(obj);

        this.id = obj.$key;
        this.key = obj.key;
        this.sex = obj.sex;
        this.famc = obj.famc;
        this.fams = obj.fams;
        this.image = obj.image;
        this.last_name = obj.last;
        this.first_name = obj.first;
        this.middle_name = obj.middle;
        this.description = obj.description || "";

        if( obj.birth ){
            this.birth = new Event(obj.birth);
            this.birth.kind = "birth";
        }
        if( obj.death ){
            this.death = new Event(obj.death);
            this.death.kind = "death";
        }

        this.events = [];
        if( obj.events ){
            this.events = obj.events.map( v => new Event(v) );
            obj.events.forEach( e => {
                //console.log('event',e.event);
                if( e.event == 'birt' ) this.birth = new Event(e);
                if( e.event == 'deat' ) this.death = new Event(e);
            });
        }
    }

    build(set) : Member[] {
        let target: Member[] = []; 
        if( set ) { for (let x of set) { target.push( new Member(x) ); }}
        return target;
    }

    birth_string(){
        return this.birth ? this.birth.as_date_string() : "";
    }

    death_string(){
        return this.death ? this.death.as_date_string() : "";
    }
}