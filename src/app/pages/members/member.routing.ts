import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { MemberListComponent }    from './member-list.component';
import { MemberDetailsComponent }  from './member-details.component';

import { UserGuard } from '../../guards/user.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'members',  component: MemberListComponent, canActivate: [UserGuard] },
      { path: 'member/:id', component: MemberDetailsComponent, canActivate: [UserGuard] }
    ])
  ],
  exports: [ RouterModule ]
})
export class MemberRouter { }
