import {Pipe, PipeTransform} from '@angular/core';

// change an event into a display string

@Pipe({name: 'event', pure: false})
export class EventPipe implements PipeTransform {
    transform(input:any, length: number): string {
        //console.log("EventPipe: input...",input);
        if( !input ) return "error";
        switch (input.event) { 
            case 'birt': return this.format("Born",input);
            case 'deat': return this.format("Died",input)
            default: return JSON.stringify(input);
        } 
    }

    format(type: string,event: any){
        var text = type;
        if( event.date ) text += " in/on " + event.date;
        if( event.place ) text += " at " + event.place;
        return text;
    }
}