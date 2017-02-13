import { Component } from '@angular/core';
import { DashboardComponent } from "./dashboard.component"

@Component({
  selector: 'kz-calendar-buttons',
  template: `
        <button class="app-icon-button" (click)="changeViewMonth(-1)"><i class="material-icons">chevron_left</i></button>
        <button class="app-icon-button" (click)="setViewThisMonth()"><i class="material-icons">today</i></button>
        <button class="app-icon-button" (click)="changeViewMonth(+1)"><i class="material-icons">chevron_right</i></button>
  `
})

export class CalendarButtonsComponent {
  
    constructor(private parent: DashboardComponent) {}

    setViewThisMonth(): void { this.parent.setViewThisMonth(); }
    changeViewMonth(inc): void { this.parent.changeViewMonth(inc); }
}