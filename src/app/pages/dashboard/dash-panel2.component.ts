import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'kz-dash-panel2',
  templateUrl: "./dash-panel2.component.html"
})
export class DashPanelTwoComponent implements OnInit {

    month: string = "error";
    birthdays: any[] = [];

    constructor( private dashboardService: DashboardService ) {}

    ngOnInit() { 
        console.log("DashPanelTwoComponent#init");

        var today = new Date();
        this.month = today.toLocaleString("en-us", { month: "long" });
        this.birthdays = this.dashboardService.getBirthdays(today.getMonth());
    }
}