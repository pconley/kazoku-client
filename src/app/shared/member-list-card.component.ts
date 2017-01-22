import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'kz-member-list-card',
  template: `<h4>{{title}}</h4>
            <ul>
            <li *ngFor='let mem of members'>
                <a href="#" [routerLink]="['/member', mem.$key]">
                    {{mem | memberHeader : withlast : true | titleCase }}
                </a>
            </li>
            </ul>`
})

export class MemberListCardComponent implements OnChanges {

    withlast: boolean = false;

    @Input() title: string;
    @Input() members: any[];
    @Input() showlast: string;

    constructor() {}

    ngOnChanges(): void {
        //console.log("card: showlast = "+this.showlast);
        var input = this.showlast.toUpperCase();
        this.withlast = false; // default
        this.withlast = input == "T" || input == "TRUE"  ;
    }

}

