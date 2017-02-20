import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FileItem } from '../../directives/file-item';
import { UploadImagesService } from '../../services/upload-images.service';

enum UploadState { Start, Ready, Loading, Loaded }

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit {

    item : FileItem;
    state : BehaviorSubject<UploadState>;
    messages : string[] = [
      "Select an image file to upload.",
      "Upload this file... or select a different one.",
      "Please wait.  Your file is uploading to the server...",
      "File uploaded! You can select another file to upload."
    ];

    constructor(public uploadImagesService: UploadImagesService) {}

    ngOnInit(){
        this.state = new BehaviorSubject(UploadState.Start);
        // var texts = ["Start","Ready","Loading","Loaded"];
        // var subscription = this.state.subscribe(
        //   (state) => console.log('Upload State: ' + state + " = " + texts[state]),
        //   (error) => console.log('State Error: ' + error),
        //   () => console.log('State Completed') 
        // );
    }

    onChange(event: EventTarget) {
        let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        this.item = new FileItem(target.files.item(0));

        var reader = new FileReader();
        reader.onloadend = () => {
            this.item.source = reader.result
            this.state.next(UploadState.Ready);
        };
        // now we initiate the read of the file
        reader.readAsDataURL(this.item.file);
    }

    upload() {
        //console.log("trigger upload. file item...",this.item);
        this.state.next(UploadState.Loading);
        // slow down so we can see the "uploading" message
        //setTimeout(() => {
            this.uploadImagesService
                .uploadImageToFirebase(this.item)
                .subscribe( b => this.state.next(UploadState.Loaded) );
        //}, 3000);
    }
}