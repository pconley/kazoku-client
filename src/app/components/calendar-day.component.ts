import { Component, Input } from '@angular/core';

@Component({
  selector: 'kz-cal-day',
  template: `<div class="ui segments">
                <div class="ui red segment">{{title}}</div>
                <div class="ui yellow secondary segment">
                    <p *ngFor='let line of lines'>{{line}}&nbsp;</p>
                </div>
            </div>`
})
export class CalendarDayComponent {

    // used in the html to pass values
    @Input() title: string;
    @Input() body: string;
    @Input() lines: string[];

    constructor() {}
}
