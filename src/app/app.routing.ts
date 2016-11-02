import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
        { path: '',  redirectTo: 'home', pathMatch: 'full' },
        { path: "access_token", redirectTo: 'home' },
        { path: "**", redirectTo: 'error' }
    ])
  ],
  exports: [ RouterModule ]
})
export class AppRouting {}
