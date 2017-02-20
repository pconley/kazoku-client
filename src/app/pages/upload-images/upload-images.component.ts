import { Component } from '@angular/core';
import { FileItem } from '../../directives/file-item';
import { UploadImagesService } from '../../services/upload-images.service';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent {

    show_upload_button : boolean = false;
    item : FileItem;

    constructor(public uploadImagesService: UploadImagesService) {
    }

    onChange(event: EventTarget) {
        var that = this;
        let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        this.item = new FileItem(target.files.item(0));
        this.show_upload_button = true;

        var reader = new FileReader();
        reader.onloadend = function() {
             that.item.source = reader.result;
        }
        reader.readAsDataURL(this.item.file);
    }

    upload() {
        console.log("upload. file item...",this.item);
        this.uploadImagesService.uploadImageToFirebase(this.item);
        this.show_upload_button = false;
    }

}
