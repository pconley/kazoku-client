import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAuth } from "angular2-jwt";
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRouting } from "./app.routing";

import { ApiService } from "./services/api.service"
import { AuthService } from "./services/auth.service"
import { FirememService } from './services/firemem.service';
import { DialogService } from './services/dialog.service';
import { UploadImagesService } from './services/upload-images.service';

import { HomeModule }      from "./pages/home/home.module";
import { NotesModule }     from "./pages/notes/notes.module";
import { ErrorModule }     from "./pages/error/error.module";
import { SampleModule }    from "./pages/sample/sample.module";
import { MemberModule }    from "./pages/members/member.module";
import { ContactModule }   from "./pages/contact/contact.module";
import { ProfileModule }   from "./pages/profile/profile.module";
import { DashboardModule } from "./pages/dashboard/dashboard.module";

import { UploadImagesModule } from "./pages/upload-images/upload-images.module";

import { SharedModule } from "./shared/shared.module";

import { AngularFireModule } from 'angularfire2';
import { AuthProviders, AuthMethods } from 'angularfire2';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyBX3w9-oLe2sk2bz-AQoQ99RfWIS9gA_zU',
  authDomain: 'localhost',
  //authDomain: 'material1-2ca42.firebaseapp.com',
  databaseURL: 'material1-2ca42.firebaseio.com',
  storageBucket: 'gs://material1-2ca42.appspot.com',
  //messagingSenderId: '<your-messaging-sender-id>'
};

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    // core angular elements
    BrowserModule, FormsModule, HttpModule,
    //
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    // these are the page level modules
    HomeModule, ProfileModule, SampleModule, 
    DashboardModule, ContactModule, ErrorModule,
    MemberModule, NotesModule,
    UploadImagesModule,
    SharedModule,
    // core material elements
    MaterialModule.forRoot(),
    AppRouting
  ],
  providers: [
    // globally available services at this top level
    AuthService, ApiService, 
    DialogService, FirememService,
    UploadImagesService,
    provideAuth({
        globalHeaders: [{"Content-type": "application/json"}],
        //newJwtError: ,true,
        noTokenScheme: true
    })
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
