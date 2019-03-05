import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { RepairingService } from './repairing.service';
import { map } from 'rxjs/operators';

@Component({
    templateUrl: 'repairing.component.html',
    styleUrls: ['repairing.component.css'],
    providers: []
})
export class RepairingComponent {
    progress$: BehaviorSubject<boolean | number> = new BehaviorSubject(false);
    isLoading$: Observable<boolean>;

    constructor(repairingService: RepairingService) {
        this.isLoading$ = this.progress$.pipe(
            map(progress => progress !== false && progress !== 1)
        );
    }
}
