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
        query: {
            limitToLast: 10,
            orderByKey: true
        }
        });
        
        console.log("members...",this.members)
    }

    getMemberObservable(key: string): Observable<any>{

        console.log("gmo: key = "+key);


        return this.af.database.object('/members/'+key);
  }
        // return this.af.database
        //     .object('/members/'+key, { preserveSnapshot: true })
        //     .first()
        //     // .subscribe(member => {
            //     console.log("  member...",member);
            //     console.log("  key = "+member.key);
            //     this.member = member.val(); })

    //}

    // xetMember(id: number): Observable<Member> {
    //     console.log(`*** MemberService#getMember: id=${id}`);
    //     //this.memberCache = { id:99, key:'skel' }
    //     //return;
    //     if( ! this.af.auth ) return this.authError();

    //     var action = `members/${id}`;
    //     console.log(`*** MemberService#getMember: action=${action}`);
    //     return this.apiService.get(action)
    //         .map((obj: any) => <Member> obj) 
    //         .do(obj => { 
    //             console.log("MemberService#getMember: obj...",obj); 
    //             this.memberCache = new Member(obj);
    //         })
    //         .catch(this.handleError);
    // }

    // private handleError(error: Response) {
    //     console.error("MemberService#handleError: 3956...",error);
    //     return Observable.throw('Server error in MemberService: 3956');
    // }

    private authError() {
        console.error("MemberService#authError");
        return Observable.throw('Authentication Error in MemberService');
    }

}