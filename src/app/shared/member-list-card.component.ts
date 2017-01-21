import { Component, Input } from '@angular/core';


@Component({
  selector: 'kz-member-list-card',
  template: `<h4>{{title}}</h4>
            <ul>
            <li *ngFor='let mem of members'>
                    {{mem.first | titleCase}} {{mem.middle | titleCase}} 
            </li>
            </ul>`
})

export class MemberListCardComponent {

    // used in the html to pass values
    @Input() title: string;
    @Input() members: any[];

    constructor() {}
}


// import { MemberHeaderPipe } from './member_header.pipe';
// import { FamilyParentsPipe } from './family_parents.pipe';
// @NgModule({
//   imports:      [  ],
//   declarations: [ EventPipe, TitleCasePipe, MemberHeaderPipe, FamilyParentsPipe ],
//   exports:      [ EventPipe, TitleCasePipe, MemberHeaderPipe, FamilyParentsPipe ]
// })
