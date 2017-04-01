import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FirebaseObjectObservable } from 'angularfire2';

import { Observable }      from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';

import { Member   } from "../../models/member";
import { FileItem } from '../../directives/file-item';
import { UploadImagesService } from '../../services/upload-images.service';
import { FirememService } from '../../services/firemem.service';

enum UploadState { Start, Ready, Loading, Loaded }

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit {

    member: Member;
    memberFOO: FirebaseObjectObservable<Member>;
    state : BehaviorSubject<UploadState>;
    messages : string[] = [
      "Select an image file to upload.",
      "Upload this file... or select a different one.",
      "Please wait.  Your file is uploading to the server...",
      "File uploaded! You can select another file to upload."
    ];

    cropperData:any;
    cropperSettings: CropperSettings;

    constructor(
        public uploadImagesService: UploadImagesService,
        private FMS: FirememService,
        private route: ActivatedRoute,
        private router: Router
    ) {
      this.cropperSettings = new CropperSettings();
      this.cropperSettings.width = 200;
      this.cropperSettings.height = 200;

      this.cropperSettings.croppedWidth = 200;
      this.cropperSettings.croppedHeight = 200;

      this.cropperSettings.canvasWidth = 500;
      this.cropperSettings.canvasHeight = 300;

      this.cropperSettings.minWidth = 10;
      this.cropperSettings.minHeight = 10;

      this.cropperSettings.rounded = false;
      this.cropperSettings.keepAspect = true; // square

      this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
      this.cropperSettings.cropperDrawSettings.strokeWidth = 2;

    //   this.cropperData = {};
    } 

    ngOnInit(){
        this.cropperData = {};
        this.state = new BehaviorSubject(UploadState.Start);

        this.route.params
            .map(params => params['id'])
            .subscribe( id => {
                console.log("route changed to upload image id = "+id);
                this.state.next(UploadState.Start);
                this.cropperData = {};
                this.memberFOO = this.FMS.get_member(id);
                this.memberFOO
                    .map( foo => new Member(foo) )
                    .subscribe( mem => {
                        console.log("upload image. member...",mem);
                        this.member = mem;
                    })
                });

        var texts = ["Start","Ready","Loading","Loaded"];
        var subscription = this.state.subscribe(
          (state) => console.log('Upload State: ' + state + " = " + texts[state]),
          (error) => console.log('State Error: ' + error),
          () => console.log('State Completed') 
        );
    }

    onChange(event: EventTarget) {
        // the user changed or uploaded the picture indicating
        // it may  ready to be uploaded
        this.state.next(UploadState.Ready);
    }

    onCropped(bounds:Bounds) {
        // the user cropped the picture indicating it may be changed
        // and therefore ready to be uploaded
        this.state.next(UploadState.Ready);
    }

    upload() {
        let image_name = 'profile'; // on firebase
        console.log("trigger upload. cropper data...",this.cropperData);
        this.state.next(UploadState.Loading);
        // slow down so we can see the "uploading" message
        //setTimeout(() => {
            this.uploadImagesService
                .uploadImageToFirebase(this.member.id,image_name,this.cropperData.image)
                .subscribe( b => this.state.next(UploadState.Loaded) );
            // at the same time, update the name to the main data 
            this.memberFOO.update({ image: image_name });
        //}, 3000);
    }

    goto_show() {
        this.router.navigate(['/member', this.member.id]);
    }
}