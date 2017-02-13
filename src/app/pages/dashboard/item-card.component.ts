import { Component, OnChanges, Input } from '@angular/core';
import { CalendarItem } from './calendar_item';

@Component({
  selector: 'kz-item-card',
  template: `<md-card>
                {{item.ordinal}}: {{item.title | titleCase }} 
                {{item.event.kind == "birt" ? "born" : "died" }} 
                in {{item.event.year}}
            </md-card>`
})

export class ItemCardComponent implements OnChanges {

    @Input() title: string = "loading..";
    @Input() item: CalendarItem;

    constructor() {}

    ngOnChanges(): void {}
}