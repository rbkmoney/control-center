import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { RepairingService } from './repairing.service';

@Component({
    templateUrl: 'repairing.component.html',
    styleUrls: ['repairing.component.css'],
    providers: []
})
export class RepairingComponent {
    progress$: Observable<number>;
    isLoading$: Observable<boolean>;

    constructor(repairingService: RepairingService) {
        this.progress$ = repairingService.progress$;
        this.isLoading$ = repairingService.isLoading$;
    }
}
