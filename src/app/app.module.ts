import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAuth } from "angular2-jwt";
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRouting } from "./app.routing";

import { ApiService } from "./services/api.service"
import { AuthService } from "./services/auth.service"
import { EventService } from "./services/event.service"
import { MemberService } from "./services/member.service"

import { AuthGuard } from "./guards/auth.guard"
import { UserGuard } from "./guards/user.guard"
import { AdminGuard } from "./guards/admin.guard"

import { HomeModule }      from "./pages/home/home.module";
import { NotesModule }     from "./pages/notes/notes.module";
import { ErrorModule }     from "./pages/error/error.module";
import { SampleModule }    from "./pages/sample/sample.module";
import { MemberModule }    from "./pages/members/member.module";
import { ContactModule }   from "./pages/contact/contact.module";
import { ProfileModule }   from "./pages/profile/profile.module";
import { DashboardModule } from "./pages/dashboard/dashboard.module";

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    // core angular elements
    BrowserModule, FormsModule, HttpModule,
    // these are the page level modules
    HomeModule, ProfileModule, SampleModule, 
    DashboardModule, ContactModule, ErrorModule,
    MemberModule, NotesModule,
    // core material elements
    MaterialModule.forRoot(),
    AppRouting
  ],
  providers: [
    // globally available services at this top level
    EventService, AuthService, ApiService, 
    MemberService,
    // here are the custom route gaurds
    AuthGuard, UserGuard, AdminGuard,
    provideAuth({
        globalHeaders: [{"Content-type": "application/json"}],
        //newJwtError: true,
        noTokenScheme: true
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
