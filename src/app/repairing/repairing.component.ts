import { Component } from '@angular/core';

import { RepairingService } from './repairing.service';

@Component({
    templateUrl: 'repairing.component.html',
    styleUrls: ['repairing.component.css'],
    providers: []
})
export class RepairingComponent {
    progress: number;
    isLoading: boolean;

    constructor(repairingService: RepairingService) {
        repairingService.isLoading$.subscribe(isLoading => (this.isLoading = isLoading));
        repairingService.progress$.subscribe(progress => (this.progress = progress));
    }
}
