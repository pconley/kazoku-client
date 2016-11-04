import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'kz-dashboard',
  templateUrl: "./dashboard.component.html"
})
export class DashboardComponent implements OnInit {

    profile: any = null;

    constructor( private profileService: DashboardService ) {}

    ngOnInit() { 
        //this.profile = this.profile || this.profileService.load_profile();
    }

}