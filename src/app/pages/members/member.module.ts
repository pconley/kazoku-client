import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MemberRouter } from './member.routing';
import { MemberFilterPipe } from "./member-filter.pipe";
import { MemberListComponent } from "./member-list.component";
import { MemberShowComponent } from "./member-show.component";
import { MemberEditComponent } from "./member-edit.component";

import { PipesModule } from "../../pipes/pipes.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    imports: [ SharedModule, PipesModule, MemberRouter ],
    declarations: [ 
        // member pages
        MemberListComponent, MemberShowComponent, MemberEditComponent,
        // pipes
        MemberFilterPipe 
    ],
    bootstrap: [ MemberListComponent ],
    providers: [ ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ] 
})

export class MemberModule { }