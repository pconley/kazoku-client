import {Component, OnInit} from '@angular/core';
import {NewAuthService, User} from '../../services/newauth.service'
 
@Component({
    selector: 'login-form',
    providers: [NewAuthService],
    templateUrl: "./login.component.html"
})
 
export class LoginComponent implements OnInit {
 
    user = new User('pat','pswd');
    //public errorMsg = '';
 
    constructor( private _service: NewAuthService ) {}

    ngOnInit(){ 
        console.log("login.component: init"); 
        this.user = new User('pat2','pswd2');
    }
 
    login() {
        console.log("login.component: login user...",this.user);
        if(!this._service.login(this.user)){
            console.log("login.component: login failed")
            //this.errorMsg = 'Failed to login';
        }
    }

    onSubmit(form) { 
        console.log("*** login#submit");
        if(form.valid) {
            alert("Login Form is Valid");
        } else {
            alert("Login Form Not Valid");
        }
    }
}