import { NgModule }         from '@angular/core';
import { CommonModule }     from "@angular/common";
import { NotesComponent }   from "./notes.component";
import { NotesRouter }      from "./notes.routing";

@NgModule({
    imports: [ CommonModule, NotesRouter ],
    declarations: [ NotesComponent ],
    bootstrap:    [ NotesComponent ]
})
export class NotesModule { }