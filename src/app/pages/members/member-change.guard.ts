import { Injectable } from '@angular/core';
import { CanDeactivate,ActivatedRouteSnapshot,RouterStateSnapshot }  from '@angular/router';

import { MemberEditComponent } from './member-edit.component';

@Injectable()
export class MemberChangeGuard implements CanDeactivate<MemberEditComponent> {

  canDeactivate(
    component: MemberEditComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {

    // console.log("MemberChangeGuard: id = "+route.params['id']);
    // console.log("MemberChangeGuard: url = "+state.url);
    // console.log("MemberChangeGuard: original...",component.original);
    // console.log("MemberChangeGuard: member...",component.member);

    if ( !component.hasChanged() ) {
        console.log("... no change");
        // there was no change to worry about
        return true; // allow page exit to new url
    }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return component.dialogService.confirm('Discard Member Changes?');
  }
}