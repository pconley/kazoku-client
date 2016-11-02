import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAuth } from "angular2-jwt";
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRouting } from "./app.routing";


import { AuthService } from "./services/auth.service"
import { EventService } from "./services/event.service"

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule,
    MaterialModule.forRoot(),
    AppRouting
  ],
  providers: [
    EventService, AuthService,
    provideAuth({
        globalHeaders: [{"Content-type": "application/json"}],
        //newJwtError: true,
        noTokenScheme: true
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
