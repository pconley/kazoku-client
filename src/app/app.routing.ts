import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
        { path: '',  redirectTo: 'dashboard', pathMatch: 'full' },
        { path: "access_token", redirectTo: 'dashboard' },
        { path: "**", redirectTo: 'error' }
    ])
  ],
  exports: [ RouterModule ]
})
export class AppRouting {}
