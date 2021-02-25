import { Component } from '@angular/core';

@Component({
    templateUrl: 'domain-config-objects.component.html',
})
export class DomainConfigObjectsComponent {
    businessScheduleObjects: string[] = [
        '2 - NBD / 20.00',
        '9 - mon-sun on wen',
        '15 - 1, 11, 21 days of month',
        '28 - NBD / 00.00',
        '24 - Every 28th day of month',
    ];
}
