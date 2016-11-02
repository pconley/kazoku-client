import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";

import { HomeComponent } from "./home.component";
import { routing } from "./home.routing";

//import { SharedModule } from "../shared/shared.module";
//import { ContactModule } from "../contact/contact.module";
//import { ExampleComponent } from "../example/example.component";

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        routing,
        //SharedModule.forRoot(),
        //ContactModule
    ],
    declarations: [
        HomeComponent //, ExampleComponent
    ],
    bootstrap: [
        HomeComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class HomeModule {
    
    public goto() {
        console.log("*** HomeModule#goto");
        //this.router.navigate(['']);
  };
}