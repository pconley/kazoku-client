import { NgModule }         from '@angular/core';
import { CommonModule }     from "@angular/common";
import { ErrorComponent }   from "./error.component";
import { ErrorRouter }      from "./error.routing";

@NgModule({
    imports: [ CommonModule, ErrorRouter ],
    declarations: [ ErrorComponent ],
    bootstrap:    [ ErrorComponent ]
})
export class ErrorModule { }