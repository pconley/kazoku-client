import { NgModule }         from '@angular/core';
import { EventPipe }        from './event.pipe';
import { TitleCasePipe }    from './titlecase.pipe';
import { MemberHeaderPipe } from './member_header.pipe';
@NgModule({
  imports:      [  ],
  declarations: [ EventPipe, TitleCasePipe, MemberHeaderPipe ],
  exports:      [ EventPipe, TitleCasePipe, MemberHeaderPipe ]
})
export class PipesModule { }