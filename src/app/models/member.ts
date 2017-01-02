import { Event } from './event';

export class Member {
    id: number;
    key: string;
    first_name: string;
    last_name: string;
    description: string;
    selected: boolean;
    birth: Event;
    death: Event;
    parents: Member[];
    spouses: Member[];
    siblings: Member[];
    children: Member[];
    range: string; // derived display range
    display_range: string;

    constructor(obj: any) {
        //console.log("member constructor. obj...",obj);
        this.id = obj.id;
        this.key = obj.key;
        this.last_name = obj.last_name;
        this.first_name = obj.first_name;
        this.description = obj.description || "";
        this.birth = new Event(obj.birth);
        this.death = new Event(obj.death);
        this.parents = this.build(obj.parents);
        this.spouses = this.build(obj.spouses);
        this.siblings = this.build(obj.siblings);
        this.children = this.build(obj.children);
        this.range = "(1900-2020)"; // TODO: fix
        //console.log("member constructor complete");
    }

    build(set) : Member[] {
        let target: Member[] = []; 
        if( set ) { for (let x of set) { target.push( new Member(x) ); }}
        return target;
    }

    birth_string(){
        return this.birth ? this.birth.to_string() : "";
    }

    death_string(){
        return this.death ? this.death.to_string() : "";
    }
}
