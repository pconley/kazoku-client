import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kz-dashboard',
  templateUrl: "./dashboard.component.html"
})
export class DashboardComponent implements OnInit {

    constructor( ) {
        //this.today(); // initial view is today
    }

    ngOnInit() { 
        //this.profile = this.profile || this.profileService.load_profile();
    }


}