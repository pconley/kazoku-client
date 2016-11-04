import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { MemberListComponent }    from './member-list.component';
import { MemberDetailsComponent }  from './member-details.component';

import { CanActivateViaAuthGuard } from '../../services/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'members',  component: MemberListComponent, canActivate: [CanActivateViaAuthGuard] },
      { path: 'member/:id', component: MemberDetailsComponent, canActivate: [CanActivateViaAuthGuard] }
    ])
  ],
  exports: [ RouterModule ]
})
export class MemberRouter { }
