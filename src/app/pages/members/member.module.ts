import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { MemberRouter } from './member.routing';
import { MemberListComponent } from "./member-list.component";
import { MemberDetailsComponent } from "./member-details.component";

import { StarComponent } from "../../components/stars/star.component";
import { NoticeComponent } from "../../components/notice.component";

// the turorial showed this in the app component, but
// i could only get ngModel to work after puttting here
import { FormsModule } from '@angular/forms';

import { MemberFilterPipe } from "./member-filter.pipe";
import { TitleCasePipe } from "../../pipes/titlecase.pipe";

@NgModule({
    imports: [
        // core angular stuff
        CommonModule, FormsModule, HttpModule,
        // material design stuff
        MaterialModule.forRoot(),
        // kz custom stuff
        MemberRouter //, NoticeModule
    ],
    declarations: [ 
        // member pages
        MemberListComponent, MemberDetailsComponent, 
        // pipes
        MemberFilterPipe, TitleCasePipe, 
        // shared components
        StarComponent, NoticeComponent
    ],
    bootstrap: [ MemberListComponent ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})

export class MemberModule { }