import { Routes, RouterModule } from '@angular/router';

import { ContactMainComponent } from './contact-main.component';
import { ContactFormComponent } from "./contact-form.component";

export const routes: Routes = [
    { path: 'contact', component: ContactMainComponent, pathMatch: "full" },
    { path: 'contact/form', component: ContactFormComponent, pathMatch: "full" }
];

export const ContactRouter = RouterModule.forChild(routes);