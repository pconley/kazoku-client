import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';

export const routes: Routes = [
    { path: 'profile', component: ProfileComponent }
];

export const ProfileRouter = RouterModule.forChild(routes);