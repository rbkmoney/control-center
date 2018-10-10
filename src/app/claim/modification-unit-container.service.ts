import { Subject } from 'rxjs';

import { ModificationUnitContainer } from './model';
import { Injectable } from '@angular/core';

@Injectable()
export class ModificationUnitContainerService {
    containers$: Subject<ModificationUnitContainer[]> = new Subject();
    private containers: ModificationUnitContainer[] = [];

    addContainer(container: ModificationUnitContainer) {
        this.containers.push(container);
        this.containers$.next(this.containers);
    }

    removeContainer(container: ModificationUnitContainer) {

    }
}
