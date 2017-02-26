import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {

    // confirm( message: string = "Is it OK?" ){
    //     return new Promise<boolean>((resolve,reject)=>resolve(window.confirm(message)));
    // }

    check( message: string = "Is it OK?" ){
        return window.confirm(message);
    }
}