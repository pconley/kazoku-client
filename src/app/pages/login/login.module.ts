import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { MaterialModule } from '@angular/material';

import { SharedModule } from "../../shared/shared.module";

import { LoginComponent } from "./login.component";
import { LoginRouter } from "./login.routing";

@NgModule({
    imports: [
        CommonModule, HttpModule,
        SharedModule,
        MaterialModule.forRoot(),
        LoginRouter
   ],
    declarations: [ LoginComponent ],
    bootstrap: [ LoginComponent ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LoginModule {}