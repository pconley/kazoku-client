import { Component } from '@angular/core';
import { FileItem } from '../../directives/file-item';
import { UploadImagesService } from '../../services/upload-images.service';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent {

    isDropZoneOver : boolean = false;
    isEnabledUpload : boolean = true;
    files : FileList;
    item : FileItem;

    constructor(public uploadImagesService: UploadImagesService) {
    }

    public fileOverDropZone(e:any):void {
        this.isDropZoneOver = e;
    }

    xonChange(event) {
        console.log("event...",event);
        console.log("target...",event.target);
        var files = event.srcElement.files;
        console.log("files...",files);
    }


    onChange(event: EventTarget) {
        let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        let files: FileList = target.files;
        this.item = new FileItem(files.item(0));
        console.log("on change, item...",this.item);
    }

    uploadImagesToFirebase() {
        console.log("upload. file item...",this.item);
        this.isEnabledUpload = false;
        this.uploadImagesService.uploadImageToFirebase(this.item);
    }

    // clearFiles() {
    //     this.files = [];
    //     this.isEnabledUpload = true;
    // }

}
