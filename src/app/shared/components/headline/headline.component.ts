import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'cc-headline',
    templateUrl: 'headline.component.html',
    styleUrls: ['headline.component.scss'],
})
export class HeadlineComponent {
    constructor(private location: Location) {}

    // 1 and 2 is default history length
    isBackAvailable = window.history.length > 2;

    back() {
        this.location.back();
    }
}
