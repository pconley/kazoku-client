import { Event } from './event';

export class Member {
    id: string; 
    key: string;
    first_name: string;
    last_name: string;
    description: string;
    selected: boolean;
    birth: Event;
    death: Event;

    constructor(obj: any) {
        if( !obj ) return; // no action

        this.id = obj.id;
        this.key = obj.key;
        this.last_name = obj.last;
        this.first_name = obj.first;
        this.description = obj.description || "";

        if( obj.birth ){ 
            this.birth = new Event(obj.birth);
            this.birth.kind = "birth";
        }
        if( obj.death ){
            this.death = new Event(obj.death);
            this.death.kind = "death";
        }

        if( obj.events ) obj.events.forEach( e => {
            if( e.event == 'birt' ) this.birth = new Event(e);
            if( e.event == 'deat' ) this.death = new Event(e);
        });
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
