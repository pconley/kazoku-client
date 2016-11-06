import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthHttp } from "angular2-jwt";

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/do'
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { IEvent } from '../models/event';

@Injectable()
export class EventService {

    private baseUrl = 'https://kazoku-server-2016.herokuapp.com/api/v1/';
    //private baseUrl = 'http://localhost:3333/api/v1/';
    private eventUrl = this.baseUrl+'events/'; // add 1.json
    private eventsUrl = this.baseUrl+'events.json';

    public eventsCache: IEvent[] = null;

    constructor(private _http: Http, private _auth: AuthHttp) {}

    getEvents(month: number, force: boolean = false): Observable<IEvent[]> {
        // if we are not forcing a reload, and there are already
        // events stored in the events cache... then use cache
        if( !force && this.eventsCache ){
            console.log("EventService#getEvents: using cache data!");
            return Observable.of(this.eventsCache);
        }
        // otherwise do the load from the server
        return this.loadEvents(month);
    }

    getEvent(id: number): Observable<IEvent> {
        var url = `${this.eventUrl}${id}.json`;
        console.log("EventService#getEvent: url="+url);
        return this._auth.get(url)
            .map((response: Response) => <IEvent> response.json())
            .do(data => { console.log("EventService#getEvent: data...",data); })
            .catch(this.handleError);
    }
 
    loadEvents(month: number): Observable<IEvent[]> {
        var url = `${this.eventsUrl}?month=${month}`;
        console.log("EventService#loadEvents: url="+url);
        return this._auth.get(url)
            .map((response: Response) => <IEvent[]> response.json())
            .do(data => { console.log("EventService#loadEvents: count = "+data.length); })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error("EventService#handleError: 3956...",error);
        return Observable.throw('Server error: 3956');
    }
}