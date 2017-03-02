import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';

import { UploadImagesRouter }    from './upload-images.routing';
import { UploadImagesComponent } from "./upload-images.component";

import { PipesModule } from "../../pipes/pipes.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    imports: [ SharedModule, PipesModule, UploadImagesRouter ],
    declarations: [ 
        UploadImagesComponent, ImageCropperComponent
    ],
    bootstrap: [ UploadImagesComponent ],
    //providers: [ MemberChangeGuard ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ] 
})

export class UploadImagesModule { }