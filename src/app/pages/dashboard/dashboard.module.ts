import { NgModule }           from '@angular/core';
import { CalendarModule }     from 'angular-calendar';

import { SharedModule }       from "../../shared/shared.module";
import { DashboardRouter }    from "./dashboard.routing";
import { DashboardComponent } from "./dashboard.component";
import { EventTodayPipe }     from "./event-today.pipe";

@NgModule({
    imports: [ 
        SharedModule,
        DashboardRouter,
        CalendarModule.forRoot()
    ],
    declarations: [ DashboardComponent, EventTodayPipe ],
    bootstrap: [ DashboardComponent ]
})
export class DashboardModule { }