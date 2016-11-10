import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from '../../guards/admin.guard';

import { SampleComponent } from './sample.component';

export const routes: Routes = [
    { path: 'sample', component: SampleComponent, canActivate: [AdminGuard]  }
];

export const SampleRouter = RouterModule.forChild(routes);