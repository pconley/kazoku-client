import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { RouterModule } from '@angular/router';

import { MemberRouter } from './member.routing';
import { MemberFilterPipe } from "./member-filter.pipe";
import { MemberListComponent } from "./member-list.component";
import { MemberShowComponent } from "./member-show.component";
import { MemberEditComponent } from "./member-edit.component";
import { MemberDetailsComponent } from "./member-details.component";

import { PipesModule } from "../../pipes/pipes.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    imports: [
        HttpModule,
        SharedModule,
        PipesModule,
        MemberRouter
    ],
    declarations: [ 
        // member pages
        MemberListComponent, MemberDetailsComponent, 
        MemberShowComponent, MemberEditComponent,
        // pipes
        MemberFilterPipe 
    ],
    bootstrap: [ MemberListComponent ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class MemberModule { }