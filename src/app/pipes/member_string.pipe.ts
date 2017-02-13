import {Pipe, PipeTransform} from '@angular/core';

import {Member} from '../models/member';

//
// returns the display text for a member
// optionally with the lastname and birth year
// usage:
//
//

@Pipe({name: 'memberString', pure: false})
export class MemberStringPipe implements PipeTransform {
    transform(input:any, showlast = true, showdate = false ): string {
        if( !input ) return "error";
        var text = this.name_string(input,showlast);
        if( showdate ) text += " (" + this.date_string(input) + ")";
        return text.trim();
    }

    format(type: string,event: any){
        var text = type;
        if( event.date ) text += " in/on " + event.date;
        if( event.place ) text += " at " + event.place;
        return text;
    }

    name_string(mem,showlast){
        var text = '';
        if( mem.first_name  ) text += " " + mem.first_name;
        if( mem.middle_name ) text += " " + mem.middle_name;
        if( mem.last_name   ) text += " " + mem.last_name;
        return text;
    }

    date_string(mem){
        var text = this.year_string(mem.birth);
        text +=  mem.death ? " - "+this.year_string(mem.death) : "";
        return text;
    }

    year_string(event): string {
        if( !event ) return "?";
        return event.year > 0 ? event.year : "?";
    }
}