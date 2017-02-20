import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FirebaseApp } from 'angularfire2';
import { FileItem } from '../directives/file-item';
//import * as firebase from 'firebase';
//import * as _ from 'lodash';

@Injectable()
export class UploadImagesService {

  constructor(
    public af: AngularFire,
    @Inject(FirebaseApp) private FBA
  ) { }

  // listLastImages(numberOfImages: number): FirebaseListObservable<any[]>{
  //   return this.af.database.list("/images", {
  //       query: { limitToLast: numberOfImages}
  //   });    
  // }

  uploadImageToFirebase(item: FileItem) {
      console.log("upload service. file item...",item);

      item.isUploading = true;

      let url : string = `images/${item.file.name}`;
      let storageRef = this.FBA.storage().ref();
      let uploadTask: firebase.storage.UploadTask = storageRef.child(url).put(item.file);
      
      uploadTask.on('state_changed', 
        (snapshot) => item.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => {},
        () => {
          item.url = uploadTask.snapshot.downloadURL;
          item.isUploading = false;
          this.saveImage({ name: item.file.name, url: item.url });
        }
      );
  }

  private saveImage(image:any) {
      console.log("save image: ",image);
      this.af.database.list("/images").push(image);
  }

}