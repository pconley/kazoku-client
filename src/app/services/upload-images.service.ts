import { Injectable, Inject } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { FileItem } from '../directives/file-item';

@Injectable()
export class UploadImagesService {

  constructor(
    @Inject(FirebaseApp) private FBA
  ) { }

  uploadImageToFirebase(item: FileItem) {
      console.log("upload service. file item...",item);

      item.isUploading = true;

      let url : string = `images/${item.file.name}`;
      let storageRef = this.FBA.storage().ref();
      let uploadTask: firebase.storage.UploadTask = storageRef.child(url).put(item.file);
      
      uploadTask.on('state_changed', 
        (snapshot) => item.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => { console.error("upload image on task failed: "+error); },
        () => { // on completion of the upload
          item.url = uploadTask.snapshot.downloadURL;
          item.isUploading = false;
          //this.saveImage({ name: item.file.name, url: item.url });
        }
      );
  }
}