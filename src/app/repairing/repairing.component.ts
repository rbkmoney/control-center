import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RepairingService } from './repairing.service';

@Component({
    templateUrl: 'repairing.component.html',
    styleUrls: ['repairing.component.scss'],
    providers: [],
})
export class RepairingComponent {
    progress$: Observable<number>;
    isLoading$: Observable<boolean>;

    constructor(repairingService: RepairingService) {
        this.progress$ = repairingService.progress$;
        this.isLoading$ = repairingService.isLoading$;
    }

    get progressBarMode$() {
        return this.progress$.pipe(
            map((progress) => (progress === 0 ? 'indeterminate' : 'determinate'))
        );
    }

    get progressBarValue$() {
        return this.progress$.pipe(
            map((progress) => (progress === 0 ? undefined : progress * 100))
        );
    }
}
