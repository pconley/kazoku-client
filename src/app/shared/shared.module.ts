import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { MaterialModule }      from '@angular/material';

import { StarComponent }       from './stars/star.component';
import { SpinnerComponent }    from './spinner/spinner.component';
import { NoticeComponent }     from './notice.component';

@NgModule({
  imports:      [ CommonModule, FormsModule, MaterialModule.forRoot() ],
  declarations: [ StarComponent, NoticeComponent, SpinnerComponent ],
  exports:      [ 
      // kz shared components
      StarComponent, NoticeComponent, SpinnerComponent,
      // core 3rd party components
      CommonModule, FormsModule, MaterialModule
    ]
})
export class SharedModule { }