import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { MaterialModule } from '@angular/material';

import { HomeComponent } from "./home.component";
import { HomeRouter } from "./home.routing";

@NgModule({
    imports: [
        CommonModule, HttpModule,
        MaterialModule.forRoot(),
        HomeRouter
   ],
    declarations: [ HomeComponent ],
    bootstrap: [ HomeComponent ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeModule {}