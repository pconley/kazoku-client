import { NgModule }           from '@angular/core';
import { CommonModule }       from "@angular/common";
import { MaterialModule }     from '@angular/material';
import { CalendarModule }     from 'angular-calendar';

import { DashboardComponent } from "./dashboard.component";
import { DashboardRouter }    from "./dashboard.routing";

@NgModule({
    imports: [ 
        CommonModule, 
        DashboardRouter,
        // core material elements
        MaterialModule.forRoot(),
        // 3rd party material cal
        CalendarModule.forRoot()
    ],
    declarations: [ DashboardComponent ],
    bootstrap: [ DashboardComponent ]
})
export class DashboardModule { }