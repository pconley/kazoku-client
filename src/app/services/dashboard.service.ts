import { Injectable } from '@angular/core';

// DUMMY service(s) to be replaced by something more generic
// like pulling data from the events

@Injectable()
export class DashboardService {

    constructor() {}

    getBirthdays(month: number){
        return [
            {name: "mj", month: month-1, day: 29, date: new Date(2016,10,1)},
            {name: "pat", month: month, day: 1, date: new Date(2016,10,1)},
            {name: "mike", month: month, day: 3, date: new Date(2016,10,3)},
            {name: "tim", month: month, day: 5,  date: new Date(2016,10,5)},
            {name: "claire", month: month, day: 3, date: new Date(2016,10,3)},
            {name: "elaine", month: month, day: 20, date: new Date(2016,10,13)},
            {name: "ted", month: month+1, day: 1, date: new Date(2016,10,13)}
        ];
    }

}