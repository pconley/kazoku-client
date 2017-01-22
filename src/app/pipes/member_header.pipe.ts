import {Pipe, PipeTransform} from '@angular/core';

// returns the display text for a member
// optionally with the lastname and birth year

@Pipe({name: 'memberHeader', pure: false})
export class MemberHeaderPipe implements PipeTransform {
    transform(input:any, showlast = true, showdate = false ): string {
        if( !input ) return "error";
        var text = '';
        if( input.first  ) text += " " + input.first;
        if( input.middle ) text += " " + input.middle;
        if( showlast && input.last ) text += " " + input.last;
        if( showdate && input.year ) text += " ("+ input.year + ")";
        return text.trim();
    }

    format(type: string,event: any){
        var text = type;
        if( event.date ) text += " in/on " + event.date;
        if( event.place ) text += " at " + event.place;
        return text;
    }
}