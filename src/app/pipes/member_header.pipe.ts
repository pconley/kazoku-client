import {Pipe, PipeTransform} from '@angular/core';

// returns the display text for a member
// optionally with the lastname and birth year

@Pipe({name: 'memberHeader', pure: false})
export class MemberHeaderPipe implements PipeTransform {
    transform(input:any, showlast = true, showdate = false ): string {
        if( !input ) return "error";
        var text = '';
        if( input.first_name  ) text += " " + input.first_name;
        if( input.middle_name ) text += " " + input.middle_name;
        if( showlast && input.last_name ) text += " " + input.last_name;
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