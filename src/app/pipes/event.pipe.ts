import {Pipe, PipeTransform} from '@angular/core';

// change an event into a display string

@Pipe({name: 'event', pure: false})
export class EventPipe implements PipeTransform {
    transform(input:any, length: number): string {
        //console.log("EventPipe: input...",input);
        if( !input ) return "error";
        switch (input.kind) { 
            case 'birt': return this.format("Born",input);
            case 'deat': return this.format("Died",input)
            case 'other': return this.format("Other",input)
            default: return JSON.stringify(input);
        } 
    }

    format(type: string,event: any){
        var text = type + ":";
        if( event.date  ) text += " on " + this.format_date(event.day,event.month,event.year);
        if( event.type  ) text += " " + event.type;
        if( event.place ) text += " at " + event.place;
        if( event.notes ) text += " " + event.notes.join();
        return text;
    }

    format_date(day, month, year){
        return month+ "/" +day+"/"+year;
    }
}