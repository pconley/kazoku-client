import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MaterialModule } from '@angular/material';

import { SampleComponent } from "./sample.component";
import { SampleRouter } from "./sample.routing";

@NgModule({
    imports:      [ CommonModule, SampleRouter, MaterialModule.forRoot() ],
    declarations: [ SampleComponent ],
    bootstrap:    [ SampleComponent ],
    schemas:      [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SampleModule {}