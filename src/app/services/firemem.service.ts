import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';

import { Event } from '../models/event';
import { Member } from '../models/member';

@Injectable()
export class FirememService {

    public members: Observable<any[]>;
    public member: Observable<any>;

    constructor(
        private af: AngularFire
    ) {
        console.log("*** FirememService#constructor");
        this.members = new Observable<any[]>();
        this.members = af.database.list('/members', {
            query: { limitToFirst: 500, orderByKey: true }
        });
        console.log("members...",this.members)
    }

    // getMemberObservable(key: string): Observable<any>{
    //     console.log("gmo: key = "+key);
    //     return this.af.database.object('/members/'+key);
    // }

    get_member( id ){
        //console.log("fms#get_member: id = "+id);
        return this.af.database
            .object('/members/'+id)
            //.do( obj => console.log("fms#get_member. result...",obj) )
    }
    get_mem_by_key( key ){
        //console.log("fms#get_mem_by_key: key = "+key);
        return this.af.database
            .list('/members/',{query: {orderByChild: 'key', equalTo: key}})
            //.do( arr => console.log("fms#get_mem_by_key: result...",arr) )
    }
    get_members( famkey ){
        //console.log("fms#get_members: famkey = "+famkey);
        return this.af.database
            .list('/members',{query: {orderByChild: 'famc', equalTo: famkey}})
            .first()
            //.do( array => console.log("fms#get_members:  result...",array) )
    }
    get_family( famkey ){
        //console.log("fms#get_family: famkey = "+famkey);
        return this.af.database
            .list('/families',{query: {orderByChild: 'key', equalTo: famkey}})
            //.do( array => console.log("fms#get_family: result...",array) )
    }
}