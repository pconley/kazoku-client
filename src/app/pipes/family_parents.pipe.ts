import {Pipe, PipeTransform} from '@angular/core';

// returns the parents display string for family

@Pipe({name: 'familyParents', pure: false})
export class FamilyParentsPipe implements PipeTransform {
    transform(input:any, length: number): string {
        //console.log("EventPipe: input...",input);
        if( !input ) return "error";
        var text = '';
        if( input.husb ) text += " " + input.husb;
        if( input.wife ) text += " " + input.wife;
        return text
    }
}