import { Component, Input } from '@angular/core';

@Component({
    selector: 'cc-details-item',
    templateUrl: 'details-item.component.html'
})
export class DetailsItemComponent {
    @Input()
    title: string;
}
