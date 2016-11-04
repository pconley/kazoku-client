import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'kz-dash-panel1',
  templateUrl: "./dash-panel1.component.html"
})
export class DashPanelOneComponent implements OnInit {

    today: string = 'error';

    constructor( private dashboardService: DashboardService ) {}

    ngOnInit() { 
        console.log("DashPanelOneComponent#init");
        this.today = this.getDateAsString(new Date());
    }

    getDateAsString(date){
        var day = date.getDate();
        var month = date.toLocaleString("en-us", { month: "long" });
        var suffix = "th";
        if( day%10 === 1 && day !== 11 ) suffix = "st";
        if( day%10 === 2 && day !== 12 ) suffix = "nd";
        if( day%10 === 3 && day !== 13 ) suffix = "rd";
        // if( day === 11 ) suffix = "th";
        // if( day === 12 ) suffix = "th";
        // if( day === 13 ) suffix = "th";
        return month+" "+day+suffix;
    }
}