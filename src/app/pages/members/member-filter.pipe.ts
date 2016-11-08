import {  PipeTransform, Pipe } from '@angular/core';
import { IMember } from '../../models/member';

@Pipe({
    name: 'memberFilter'
})
export class MemberFilterPipe implements PipeTransform {

    transform(value: IMember[], args: string[]): IMember[] {

        // WIERD... the args are not as advertised in the tutorial
        // that said args[0] would be the frst string; but each char
        // is coming over as a separate string

        //console.log(args);
        if( !args ) return value; // no filter
        if( !args[0] ) return value; // no filter
        let str: string = args[0];
        // join was not found here?????
        for (var i = 1; i < args.length; i++) {
            str += args[i];
        }
        let filter: string = str.toLocaleLowerCase();
        //console.log("memberFilter: "+filter);
        let result = value.filter((member: IMember) => {
            let search_text = member.first_name + member.last_name;
            return search_text.toLocaleLowerCase().indexOf(filter) !== -1;
        });
        return result;
    }
}