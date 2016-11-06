import { NgModule }           from '@angular/core';
import { CommonModule }       from "@angular/common";
import { MaterialModule }     from '@angular/material';
import { CalendarModule }     from 'angular-calendar';

import { DashboardComponent } from "./dashboard.component";
import { DashboardRouter }    from "./dashboard.routing";

import { DashViewCalComponent }   from "./dash-view-cal.component";
import { DashViewListComponent }   from "./dash-view-list.component";
import { DashPanelThreeComponent } from "./dash-panel3.component";

import { CalendarHdrComponent } from "../../components/calendar-hdr.component";
import { CalendarDayComponent } from "../../components/calendar-day.component";

@NgModule({
    imports: [ 
        CommonModule, 
        DashboardRouter,
        // core material elements
        MaterialModule.forRoot(),
        // 3rd party material cal
        CalendarModule.forRoot()
    ],
    declarations: [ DashboardComponent, 
        DashViewCalComponent, DashViewListComponent, DashPanelThreeComponent,
        CalendarDayComponent, CalendarHdrComponent
    ],
    bootstrap: [ DashboardComponent ]
})
export class DashboardModule { }