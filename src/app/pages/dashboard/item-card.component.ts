import { Component, OnChanges, Input } from '@angular/core';
import { CalendarItem } from './calendar_item';

@Component({
  selector: 'kz-item-card',
  template: `<md-card>{{item.ordinal}}: {{item.title}}</md-card>`
})

export class ItemCardComponent implements OnChanges {

    @Input() title: string = "loading..";
    @Input() item: CalendarItem;

    constructor() {}

    ngOnChanges(): void {


        //console.log("card: showlast = "+this.showlast);
        // const s_last = this.showlast.toUpperCase();
        // this.withlast = s_last == "T" || s_last == "TRUE"  ;
        // const s_date = this.showdate.toUpperCase();
        // this.withdate = s_date == "T" || s_date == "TRUE"  ;
    }
}