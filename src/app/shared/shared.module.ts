import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { MaterialModule }      from '@angular/material';

import { PipesModule } from '../pipes/pipes.module'

import { StarComponent }       from './stars/star.component';
import { SpinnerComponent }    from './spinner/spinner.component';
import { NoticeComponent }     from './notice.component';

import { MemberListCardComponent } from './member-list-card.component';

//import { TitleCasePipe } from '../pipes/titlecase.pipe';


@NgModule({
  imports:      [ CommonModule, FormsModule, MaterialModule.forRoot(),
                  PipesModule
   ],
  declarations: [ StarComponent, NoticeComponent, SpinnerComponent,
                  MemberListCardComponent,
                  ],
  exports:      [ 
      // kz shared components
      StarComponent, NoticeComponent, SpinnerComponent,
      MemberListCardComponent,
      // pipes used
      //TitleCasePipe,
      // core 3rd party components
      CommonModule, FormsModule, MaterialModule
    ]

})
export class SharedModule { }


// import { MemberHeaderPipe } from './member_header.pipe';
// import { FamilyParentsPipe } from './family_parents.pipe';
// @NgModule({
//   imports:      [  ],
//   declarations: [ EventPipe, TitleCasePipe, MemberHeaderPipe, FamilyParentsPipe ],
//   exports:      [ EventPipe, TitleCasePipe, MemberHeaderPipe, FamilyParentsPipe ]
// })
