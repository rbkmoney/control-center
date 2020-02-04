import { Component, Input } from '@angular/core';

@Component({
    selector: 'cc-details-item',
    templateUrl: 'details-item.component.html',
    styleUrls: ['details-item.component.scss']
})
export class DetailsItemComponent {
    @Input()
    title: string;
}
