import { PipeTransform, Pipe } from '@angular/core';
import { Event } from '../../models/event';

@Pipe({
    name: 'eventToday'
})
export class EventTodayPipe implements PipeTransform {

    transform(value: Event[]): Event[] {
        let today = new Date(); 
        let the_filter = value.filter((event: Event) => {
            return event.day == today.getDate();
        });
        return the_filter;
    }
}