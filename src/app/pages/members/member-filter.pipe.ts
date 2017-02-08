import {  PipeTransform, Pipe } from '@angular/core';
import { Member } from '../../models/member';

@Pipe({
    name: 'memberFilter'
})
export class MemberFilterPipe implements PipeTransform {

    transform(value: Member[], args: string[]): Member[] {

        // WIERD... the args are not as advertised in the tutorial
        // that said args[0] would be the first string; but each char
        // is coming over as a separate string

        //console.log("member filter pipe args",args[0]);
        
        if( !args ) return value; // no filter
        if( !args[0] ) return value; // no filter
        let str: string = args[0];
        // join was not found here?????
        for (var i = 1; i < args.length; i++) {
            str += args[i];
        }
        let filter: string = str.toLocaleLowerCase();
        //console.log("memberFilter: "+filter);
        let result = value.filter((member: Member) => {
            let search_text = member.first_name + member.last_name;
            return search_text.toLocaleLowerCase().indexOf(filter) !== -1;
        });
        return result;
    }
}