import { Component } from '@angular/core';

@Component({
  selector: 'kz-member-card',
  template: '<div>Hello my name is {{name}}. <button (click)="sayMyName()">Say my name</button></div>'
})
export class MyComponent {

    name: string;

    constructor() {
        this.name = 'Max'
    }

    sayMyName() {
        console.log('My name is', this.name)
    }
}
