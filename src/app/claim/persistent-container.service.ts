import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import remove from 'lodash-es/remove';

import { PersistentContainer } from './model';
import { PartyModification } from '../damsel/payment-processing';

@Injectable()
export class PersistentContainerService {
    containers$: Subject<PersistentContainer[]> = new Subject();
    private containers: PersistentContainer[] = [];

    init(persisted: PartyModification[]) {
        this.containers = persisted.map((modification) => ({
            modification, saved: true
        }));
        this.containers$.next(this.containers);
    }

    addContainer(modification: PartyModification) {
        const typeHash = this.makeTypeHash(modification);
        const item = {
            modification,
            typeHash,
            saved: false,
        };
        const index = this.containers.findIndex((i) => i.typeHash === typeHash);
        if (index !== -1) {
            this.containers[index] = item;
        } else {
            this.containers.push(item);
        }
        this.containers$.next(this.containers.sort(this.sort)); // sort?
    }

    removeContainer(typeHash: string) {
        remove(this.containers, (container: PersistentContainer) => container.typeHash === typeHash && !container.saved);
        this.containers$.next(this.containers.sort(this.sort));
    }

    private makeTypeHash(modification: PartyModification): string {
        const modificationKeys = Object.keys(modification);
        if (modificationKeys.length !== 1) {
            return null;
        }
        const modificationUnit = modification[modificationKeys[0]];
        const modificationNames = Object.keys(modificationUnit.modification);
        if (modificationNames.length !== 1) {
            return null;
        }
        return modificationUnit.id + modificationNames[0];
    }

    private sort(a: PersistentContainer, b: PersistentContainer): number {
        if (a.saved) {
            return 1;
        }
        if (b.saved) {
            return -1;
        }
        return 0;
    }
}
