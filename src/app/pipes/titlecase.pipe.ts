import {Pipe, PipeTransform} from '@angular/core';

/*
 * Changes the case of the first letter of a given number of words in a string.
*/

@Pipe({name: 'titleCase', pure: false})
export class TitleCasePipe implements PipeTransform {
    transform(input:string, length: number): string {
        //console.log("TitleCasePipe: input...",input);
        if( !input ) return "error";
        return input.length > 0 ? input.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase() )) : '';
    }
}