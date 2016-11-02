import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";

import { ProfileComponent } from "./profile.component";
import { ProfileRouter } from "./profile.routing";

//import { SharedModule } from "../shared/shared.module";
//import { ContactModule } from "../contact/contact.module";
//import { ExampleComponent } from "../example/example.component";

@NgModule({
    imports: [
        CommonModule, 
        //HttpModule,
        ProfileRouter,
        //SharedModule.forRoot(),
        //ContactModule
    ],
    declarations: [
        ProfileComponent //, ExampleComponent
    ],
    bootstrap: [
        ProfileComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class ProfileModule {
    
}