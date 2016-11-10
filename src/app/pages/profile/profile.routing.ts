import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { UserGuard } from '../../guards/user.guard';

export const routes: Routes = [
    { path: 'profile',  component: ProfileComponent, canActivate: [UserGuard] }
];

export const ProfileRouter = RouterModule.forChild(routes);