import { Injectable } from '@angular/core';
import remove from 'lodash-es/remove';
import { Subject } from 'rxjs';

import { PartyModification } from '../thrift-services/damsel/gen-model/payment_processing';
import { PersistentContainer } from './model';

@Injectable()
export class PersistentContainerService {
    containers$: Subject<PersistentContainer[]> = new Subject();
    private containers: PersistentContainer[] = [];

    init(persisted: PartyModification[], saved = true) {
        this.containers = persisted.map((modification) => ({
            modification,
            saved,
            typeHash: !saved ? this.makeTypeHash(modification) : null,
        }));
        this.containers$.next(this.containers);
    }

    add(modification: PartyModification) {
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

    remove(typeHash: string) {
        remove(this.containers, (i) => i.typeHash === typeHash);
        this.containers$.next(this.containers.sort(this.sort));
    }

    private makeTypeHash(modification: PartyModification): string {
        const modificationKeys = Object.keys(modification);
        if (modificationKeys.length !== 1) {
            return null;
        }
        const modificationUnit = modification[modificationKeys[0]];
        return modificationUnit.id + this.getModificationName(modification);
    }

    private getModificationName(modification: PartyModification): string {
        const modificationKeys = Object.keys(modification);
        if (modificationKeys.length !== 1) {
            return 'unknown';
        }
        const modificationUnit = modification[modificationKeys[0]];
        const modificationNames = Object.keys(modificationUnit.modification);
        if (modificationNames.length !== 1) {
            return 'unknown';
        }
        return Object.keys(modificationUnit.modification)[0];
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
