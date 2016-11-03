import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { ContactRouter } from "./contact.routing";
import { ContactMainComponent } from "./contact-main.component";
import { ContactFormComponent } from "./contact-form.component";
import { ContactCardComponent } from "./contact-card.component";


@NgModule({
    imports: [ ContactRouter, MaterialModule.forRoot() ],
    exports: [ ContactCardComponent ],
    declarations: [ ContactMainComponent, ContactFormComponent, ContactCardComponent ],
    bootstrap:    [ ContactMainComponent ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ContactModule { }