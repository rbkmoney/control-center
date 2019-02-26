import { Component } from '@angular/core';

@Component({
    templateUrl: 'repairing.component.html',
    styleUrls: ['repairing.component.css'],
    providers: []
})
export class RepairingComponent {
    isLoading = false;
    displayedColumns: string[] = ['id', 'actions'];
    dataSource: Array<{ id: string }> = [];

    constructor() {}
}
