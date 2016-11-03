import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MaterialModule } from '@angular/material';

import { ProfileComponent } from "./profile.component";
import { ProfileRouter } from "./profile.routing";

@NgModule({
    imports: [
        CommonModule, 
        ProfileRouter,
        MaterialModule.forRoot()
    ],
    declarations: [ ProfileComponent ],
    bootstrap: [ ProfileComponent ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ProfileModule {}