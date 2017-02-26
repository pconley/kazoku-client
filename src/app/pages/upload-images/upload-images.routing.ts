import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserGuard }    from '../../guards/user.guard';
import { UploadImagesComponent } from './upload-images.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'upload/:id',  component: UploadImagesComponent, canActivate: [UserGuard] },
    ])
  ],
  exports: [ RouterModule ]
})
export class UploadImagesRouter { }
