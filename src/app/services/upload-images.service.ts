import { Injectable, Inject } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FileItem } from '../directives/file-item';

@Injectable()
export class UploadImagesService {

  constructor(
    @Inject(FirebaseApp) private FBA
  ) { }

  uploadImageToFirebase(id: string, item: FileItem ) : BehaviorSubject<boolean> {
      console.log("upload service. file item...",id,item);

      var subject = new BehaviorSubject<boolean>(false);

      let url : string = `images/${id}/${item.file.name}`;
      let storageRef = this.FBA.storage().ref();
      let uploadTask: firebase.storage.UploadTask = storageRef.child(url).put(item.file);
      
      uploadTask.on('state_changed', 
        (snapshot) => item.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => { console.error("image uploadTask failed: "+error); },
        () => { subject.next(true) } // on upload completion
      );

      return subject;
  }
}