import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { NotesComponent } from './notes.component';

export const routes: Routes = [
    { path: 'notes', component: NotesComponent, pathMatch: "full", canActivate: [AuthGuard] }
];

export const NotesRouter = RouterModule.forChild(routes);