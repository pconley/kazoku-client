import { Injectable, Inject } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FileItem } from '../directives/file-item';

@Injectable()
export class UploadImagesService {

  constructor(
    @Inject(FirebaseApp) private FBA
  ) { }

  uploadImageToFirebase(id: string, name: string, source: string ) : BehaviorSubject<boolean> {
      console.log("upload service",id,name);
      let blob = this.b64_to_blob(source);
      let imageUrl : string = `images/${id}/${name}`;
      let storageRef = this.FBA.storage().ref();
      let result = new BehaviorSubject<boolean>(false);
      let uploadTask: firebase.storage.UploadTask = storageRef.child(imageUrl).put(blob);
      uploadTask.on('state_changed', 
        (snapshot) => {
          //let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //console.log("progress",progress);
        },
        (error) => { console.error("image uploadTask failed: "+error); },
        () => { result.next(true) } // on upload completion
      );
      return result;
  }

  b64_to_blob(source:any, content_type?:string) : Blob {
        content_type = content_type || '';
        let [prefex,data] = source.split(',');
        var byte_characters = atob(data);
        var slice_size = 512;
        var byte_arrays = [];
        for(var offset = 0; offset < byte_characters.length; offset += slice_size) {
            var slice = byte_characters.slice(offset, offset + slice_size);
            var byte_numbers = new Array(slice.length);
            for(var i = 0; i < slice.length; i++) {
                byte_numbers[i] = slice.charCodeAt(i);
            }
            var byte_array = new Uint8Array(byte_numbers);
            byte_arrays.push(byte_array);
        }
        var blob = new Blob(byte_arrays, {type: content_type});
        return blob;
    }
}