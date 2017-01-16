import {Pipe, PipeTransform} from '@angular/core';

// returns the header text for a member

@Pipe({name: 'memberHeader', pure: false})
export class MemberHeaderPipe implements PipeTransform {
    transform(input:any, length: number): string {
        //console.log("EventPipe: input...",input);
        if( !input ) return "error";
        var text = '';
        if( input.first  ) text += " " + input.first;
        if( input.middle ) text += " " + input.middle;
        if( input.last   ) text += " " + input.last;
        text += "!";
        return text
    }

    format(type: string,event: any){
        var text = type;
        if( event.date ) text += " in/on " + event.date;
        if( event.place ) text += " at " + event.place;
        return text;
    }
}