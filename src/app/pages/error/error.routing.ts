import { Routes, RouterModule } from '@angular/router';

import { ErrorComponent } from './error.component';

export const routes: Routes = [
    { path: 'error', component: ErrorComponent, pathMatch: "full" }
];

export const ErrorRouter = RouterModule.forChild(routes);