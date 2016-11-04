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

import { IMember } from '../models/member';

@Injectable()
export class MemberService {

    public membersCache: IMember[] = null;

    constructor(
        private apiService: ApiService,
        private authService: AuthService
    ) {
        console.log("*** MemberService#constructor");
    }

    getMembers(force: boolean): Observable<IMember[]> {
        if( ! this.authService.authenticated() ) return this.authError();
        // if we are not forcing a reload, and there are already
        // members stored in the members cache... then use cache
        if( !force && this.membersCache ){
            console.log("MemberService#getMembers: using cache data!");
            return Observable.of(this.membersCache);
        }
        // otherwise do the load from the server
        return this.loadPages();
    }

    getMember(id: number): Observable<IMember> {
        if( ! this.authService.authenticated() ) return this.authError();
        console.log(`MemberService#getMember: id=${id}`);
        var action = `members/${id}`;
        return this.apiService.get(action)
            .map((obj: any) => <IMember> obj) 
            .do(obj => { console.log("MemberService#getMember: obj...",obj); })
            .catch(this.handleError);
    }

    private loadPages(): Observable<IMember[]> {
        var page = 0;
        var that = this;
        that.membersCache =  [];
        console.log("MemberService#loadPages:");
        return Observable.create(observer => {
            function recursiveFunction() {
                that.loadPage(++page)
                    .subscribe(
                        members => { 
                            console.log("loadPages: page "+page+" loaded "+members.length); 
                            // observers are shown loaded members
                            observer.next(members); 
                            // and we also accumulate a full copy in the cache
                            Array.prototype.push.apply(that.membersCache,members);
                            // stop with empty page or failsafe
                            if( members.length == 0 || page > 3 )
                                observer.complete();
                            else
                                recursiveFunction();
                        },
                        error => { 
                            // pass on the error message and stop the recusion at first error
                            console.log("MemberService#loadPages: load error = "+<any>error); 
                            observer.error(<any>error); 
                        }
                     );
            }
            recursiveFunction();
        });
    }
 
    private loadPage(page: number): Observable<IMember[]> {
        console.log("MemberService#loadPage. page="+page);
        return this.apiService.get("members",{page: page})
            .map((obj: any) => <IMember[]> obj) 
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