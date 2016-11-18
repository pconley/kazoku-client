import { Component, Input } from "@angular/core";

@Component({
    selector: "kz-spinner",
    templateUrl: "./spinner.component.html",
    styleUrls: ["./spinner.component.css"]
})
export class SpinnerComponent {
    @Input() text: string;
}
