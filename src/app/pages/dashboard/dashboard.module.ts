import { NgModule }           from '@angular/core';
import { CalendarModule }     from 'angular-calendar';

import { PipesModule }        from "../../pipes/pipes.module";
import { SharedModule }       from "../../shared/shared.module";
import { DashboardRouter }    from "./dashboard.routing";
import { DashboardComponent } from "./dashboard.component";

import { ItemCardComponent        } from "./item-card.component";
import { CalendarButtonsComponent } from "./calendar-buttons.component";

@NgModule({
    imports: [ 
        PipesModule,
        SharedModule,
        DashboardRouter,
        CalendarModule.forRoot()
    ],
    declarations: [ DashboardComponent, ItemCardComponent, CalendarButtonsComponent ],
    bootstrap: [ DashboardComponent ]
})
export class DashboardModule { }