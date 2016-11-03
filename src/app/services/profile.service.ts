import { Injectable } from '@angular/core';

@Injectable()
export class ProfileService {

    constructor() {}

    load_profile(){
        // the profile was saved to local storage (along with the
        // token_id) at the time the user logged into the system
        var json = localStorage.getItem('profile');
        //console.log("ProfileService#OnInit: json = "+json); 
        var profile = JSON.parse(json);
        profile.create_year = profile.created_at.substring(0, 4);
        console.log("ProfileService#load: profile...",profile); 
        return profile;
    }
}