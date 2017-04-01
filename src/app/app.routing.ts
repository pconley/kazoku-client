import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from "./guards/auth.guard"
import { UserGuard } from "./guards/user.guard"
import { AdminGuard } from "./guards/admin.guard"

@NgModule({
  imports: [
    RouterModule.forRoot([
        { path: '',  redirectTo: 'home', pathMatch: 'full' },
        { path: "access_token", redirectTo: 'dashboard' },
        { path: "**", redirectTo: 'dashboard' }
    ])
  ],
  exports: [ RouterModule ],
  providers: [ AuthGuard, UserGuard, AdminGuard ]
})
export class AppRouting {}
