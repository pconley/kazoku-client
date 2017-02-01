import { Component, OnChanges, Input } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'kz-member-list-card',
  template: `<h4>{{title}}</h4>
            <ul>
            <li *ngFor='let mem of members'>
                <a href="#" [routerLink]="['/member', mem.$key]">
                    {{mem | memberString : withlast : withdate | titleCase }}
                </a>
            </li>
            </ul>`
})

export class MemberListCardComponent implements OnChanges {

    withlast: boolean;
    withdate: boolean;

    @Input() title: string = "loading..";
    @Input() members: any[] = [];
    @Input() membersRef: FirebaseListObservable<any[]>;

    @Input() showlast: string = "F";
    @Input() showdate: string = "T";

    constructor() {}

    ngOnChanges(): void {
        //console.log("card: showlast = "+this.showlast);
        const s_last = this.showlast.toUpperCase();
        this.withlast = s_last == "T" || s_last == "TRUE"  ;
        const s_date = this.showdate.toUpperCase();
        this.withdate = s_date == "T" || s_date == "TRUE"  ;
    }
}