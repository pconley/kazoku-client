import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { MemberListComponent }     from './member-list.component';
import { MemberShowComponent }     from './member-show.component';
import { MemberEditComponent }     from './member-edit.component';
import { MemberDetailsComponent }  from './member-details.component';

import { UserGuard } from '../../guards/user.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'members',  component: MemberListComponent, canActivate: [UserGuard] },
      { path: 'member/:id', component: MemberShowComponent, canActivate: [UserGuard] },
      { path: 'member/edit/:id', component: MemberEditComponent, canActivate: [UserGuard] }
    ])
  ],
  exports: [ RouterModule ]
})
export class MemberRouter { }
