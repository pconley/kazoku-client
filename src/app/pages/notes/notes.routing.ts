import { Routes, RouterModule } from '@angular/router';

import { NotesComponent } from './notes.component';

export const routes: Routes = [
    { path: 'notes', component: NotesComponent, pathMatch: "full" }
];

export const NotesRouter = RouterModule.forChild(routes);