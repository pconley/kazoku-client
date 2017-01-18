import { NgModule }         from '@angular/core';
import { EventPipe }        from './event.pipe';
import { TitleCasePipe }    from './titlecase.pipe';
import { MemberHeaderPipe } from './member_header.pipe';
import { FamilyParentsPipe } from './family_parents.pipe';
@NgModule({
  imports:      [  ],
  declarations: [ EventPipe, TitleCasePipe, MemberHeaderPipe, FamilyParentsPipe ],
  exports:      [ EventPipe, TitleCasePipe, MemberHeaderPipe, FamilyParentsPipe ]
})
export class PipesModule { }