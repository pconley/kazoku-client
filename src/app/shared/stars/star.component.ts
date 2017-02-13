import { Component, OnChanges, Input,
         Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'kz-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {

    starWidth: number; 

    // this is used in the html to pass a value in
    @Input() rating: number;

    // this is a custom event that is added to the list html; it is raised in the 
    // onClick below to pass up to the nested component
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

    ngOnChanges(): void {
        //console.log("star#OnChange rating = "+this.rating);
        // set the width of the cropped box to reveal partial stars
        this.starWidth = this.rating * 110 / 5;
    }

    onClick(): void {
        //console.log('star#onClick');
        this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
    }
} 