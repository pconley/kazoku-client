import { PipeTransform, Pipe } from '@angular/core';
import { Event } from '../../models/event';

@Pipe({
    pure: false,
    name: 'eventCustom'
})
export class EventCustomPipe implements PipeTransform {

    transform(value: Event[]): Event[] {
        let the_filter = value.filter((event: Event) => {            
            return !!event.kind; //event.kind == 'birth' || event.kind == 'death';
        });
        return the_filter;
    }
}