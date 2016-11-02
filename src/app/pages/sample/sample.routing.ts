import { Routes, RouterModule } from '@angular/router';

import { SampleComponent } from './sample.component';

export const routes: Routes = [
    { path: 'sample', component: SampleComponent }
];

export const SampleRouter = RouterModule.forChild(routes);