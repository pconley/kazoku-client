import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { UserGuard } from '../../guards/user.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'dashboard',  component: DashboardComponent, canActivate: [UserGuard] }
    ])
  ],
  exports: [ RouterModule ]
})
export class DashboardRouter { }
