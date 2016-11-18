import { NgModule }           from '@angular/core';
import { CalendarModule }     from 'angular-calendar';

import { SharedModule }       from "../../shared/shared.module";
import { DashboardRouter }    from "./dashboard.routing";
import { DashboardComponent } from "./dashboard.component";

@NgModule({
    imports: [ 
        SharedModule,
        DashboardRouter,
        CalendarModule.forRoot()
    ],
    declarations: [ DashboardComponent ],
    bootstrap: [ DashboardComponent ]
})
export class DashboardModule { }