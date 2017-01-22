import { NgModule }            from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { MaterialModule }      from '@angular/material';

import { PipesModule } from '../pipes/pipes.module'

import { StarComponent }       from './stars/star.component';
import { SpinnerComponent }    from './spinner/spinner.component';
import { NoticeComponent }     from './notice.component';

import { MemberListCardComponent } from './member-list-card.component';

@NgModule({
  imports:      [ CommonModule, FormsModule, MaterialModule.forRoot(),
                  RouterModule,
                  PipesModule // my custom pipes
   ],
  declarations: [ StarComponent, NoticeComponent, SpinnerComponent,
                  MemberListCardComponent,
                  ],
  exports:      [ 
      // kz shared components
      StarComponent, NoticeComponent, SpinnerComponent,
      MemberListCardComponent,
      // core 3rd party components
      CommonModule, FormsModule, MaterialModule
    ]

})
export class SharedModule { }