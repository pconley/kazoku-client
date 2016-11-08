import { Component, Input } from "@angular/core";

@Component({
    selector: "kz-notice",
    template: '<md-card class="notice" >NOTICE: <ng-content></ng-content></md-card>',
    styles: [".notice {background: coral;}"]
})
export class NoticeComponent {
    //@Input() text: string;
}
