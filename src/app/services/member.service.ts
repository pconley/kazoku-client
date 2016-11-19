import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/do'
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from "./api.service";
import { AuthService } from "./auth.service";

import { Event } from '../models/event';
import { Member } from '../models/member';

@Injectable()
export class MemberService {

    public memberCache: Member = new Member({});
    public membersCache: Member[] = null;

    constructor(
        private apiService: ApiService,
        private authService: AuthService
    ) {
        console.log("*** MemberService#constructor");
    }

    getMembers(force: boolean): Observable<Member[]> {
        if( ! this.authService.authenticated() ) return this.authError();
        // if we are not forcing a reload, and there are already
        // members stored in the members cache... then use cache
        if( !force && this.membersCache ){
            console.log("*** MemberService#getMembers: using cache data!");
            return Observable.of(this.membersCache);
        }
        // otherwise do the load from the server
        return this.loadRanges();
    }

    saveMember(member: Member){
        console.log("*** MemberService#saveMember: member...",member);
        // WE ARE NOT YET SAVING THE CHANGES TO THE SERVER< WE
        // JUST REFLECT THE CHANGES IN THE CACHE FOR THE NEXT CALL
        this.memberCache = new Member(member);
    }

    getMember(id: number, force: boolean = false): Observable<Member> {
        console.log(`*** MemberService#getMember: id=${id}`);
        if( ! this.authService.authenticated() ) return this.authError();
        if( !force && this.memberCache.id == id ){
            console.log("*** MemberService#getMember: using cache data!");
            return Observable.of(this.memberCache);
        }
        var action = `members/${id}`;
        return this.apiService.get(action)
            .map((obj: any) => <Member> obj) 
            .do(obj => { 
                console.log("MemberService#getMember: obj...",obj); 
                this.memberCache = new Member(obj);
            })
            .catch(this.handleError);
    }

    private loadRanges(): Observable<Member[]> {
        var that = this;
        that.membersCache =  [];
        console.log("MemberService#loadRanges:");
        return Observable.create(observer => {
            function recursiveFunction(start,count) {
                that.loadRange({start: start, count: count})
                    .subscribe(
                        members => { 
                            // observers are shown set of loaded members
                            observer.next(members); 
                            // and we also accumulate a full copy in the cache
                            Array.prototype.push.apply(that.membersCache,members);
                            // stop when partial range returned or failsafe
                            if( members.length < count || start > 1000 ){
                                observer.complete();
                            } else { 
                                // increase count requested with each request
                                recursiveFunction(start+count, count+10);
                            }
                        },
                        error => { 
                            // pass on the error message and stop the recusion at first error
                            console.log("MemberService#loadRanges: load error = "+<any>error); 
                            observer.error(<any>error); 
                        }
                     );
            }
            let _start = 0;
            let _count = 20;
            recursiveFunction(_start,_count);
        });
    }

    private loadRange(args): Observable<Member[]> {
        console.log("MemberService#loader. range...",args);
        return this.apiService.get("members",args)
            .map((obj: any) => <Member[]> obj) 
            .do(obj => { console.log("MemberService#loader: members = ",obj.length); })
            .catch(this.handleError);
    }


    private handleError(error: Response) {
        console.error("MemberService#handleError: 3956...",error);
        return Observable.throw('Server error in MemberService: 3956');
    }

    private authError() {
        console.error("MemberService#authError");
        return Observable.throw('Authentication Error in MemberService');
    }
}