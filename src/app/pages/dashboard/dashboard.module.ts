import { NgModule }           from '@angular/core';
import { CommonModule }       from "@angular/common";

import { CalendarModule }     from 'angular-calendar';

import { DashboardComponent } from "./dashboard.component";
import { DashboardRouter }    from "./dashboard.routing";

import { DashPanelOneComponent }   from "./dash-panel1.component";
import { DashPanelTwoComponent }   from "./dash-panel2.component";
import { DashPanelThreeComponent } from "./dash-panel3.component";

import { CalendarHdrComponent } from "../../components/calendar-hdr.component";
import { CalendarDayComponent } from "../../components/calendar-day.component";


@NgModule({
    imports: [ 
        CommonModule, 
        DashboardRouter ,
        CalendarModule.forRoot()
    ],
    declarations: [ DashboardComponent, 
        DashPanelOneComponent, DashPanelTwoComponent, DashPanelThreeComponent,
        CalendarDayComponent, CalendarHdrComponent
    ],
    bootstrap: [ DashboardComponent ]
})
export class DashboardModule { }