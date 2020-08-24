import { Component, Input } from '@angular/core';

@Component({
    selector: 'cc-reason-content',
    templateUrl: 'reason-content.component.html',
})
export class ReasonContentComponent {
    @Input()
    text: string;
}
