import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';

import { Event } from '../models/event';
import { Member } from '../models/member';

@Injectable()
export class FirememService {

    //public events: Event[] = [];
    public members: Observable<Member[]>;

    constructor(
        private af: AngularFire
    ) {
        console.log("*** FirememService#constructor");
        //this.events = [];
        this.members = new Observable<any[]>();
        this.members = af.database
            .list('/members', {query: { limitToFirst: 500, orderByKey: true }})
            .map( arr => arr.map( v => new Member(v)) )
            .first()
            //.do( this.extract_events )

        //console.log("members...",this.members)
    }

    // extract_events( members: Member[] ){
    //     var that = this;
    //     that.events = [];
    //     console.log("extract events. member count = "+members.length);
    //     members.forEach( member => {
    //         if( member.events ){ 
    //             let [birth] = member.events.filter( event => event.kind == 'birt' );
    //             if( birth ) that.events.push( birth )
    //         }
    //     });
    // }

    get_member( id ){
        //console.log("fms#get_member: id = "+id);
        return this.af.database
            .object('/members/'+id)
            //.filter( obj => !obj.key )
            //.do( obj => console.log("fms#get_member. result...",obj) )
            .map( obj => new Member(obj) )
            //.do( obj => console.log("fms#get_member. convert...",obj) )

    }
    get_mem_by_key( key ){
        //console.log("fms#get_mem_by_key: key = "+key);
        return this.af.database
            .list('/members/',{query: {orderByChild: 'key', equalTo: key}})
            //.do( arr => console.log("fms#get_mem_by_key: result...",arr) )
            .map( arr => arr[0] ) // should be unique so convert to object
            .map( obj => new Member(obj) )
            //.do( mem => console.log("fms#get_mem_by_key. mem...",mem) )
    }
    get_members( famkey ){
        //console.log("fms#get_members: famkey = "+famkey);
        if( !famkey ) return; // no action
        return this.af.database
            .list('/members',{query: {orderByChild: 'famc', equalTo: famkey}})
            .first()
            //.do( array => console.log("fms#get_members:  obj array...",array) )
            .map( arr => arr.map( v => new Member(v)) )
            //.do( memarr => console.log("fms#get_members:  mem array...",memarr) )
    }
    get_family( famkey ){
        //console.log("fms#get_family: famkey = "+famkey);
        return this.af.database
            .list('/families',{query: {orderByChild: 'key', equalTo: famkey}})
            //.do( array => console.log("fms#get_family: array...",array) )
            .map( arr => arr[0] ) // should be unique so convert to object
            //.do( obj => console.log("fms#get_family: obj...",obj) )
    }
}