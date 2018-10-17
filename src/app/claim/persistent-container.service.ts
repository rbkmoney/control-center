import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import remove from 'lodash-es/remove';

import { ModificationGroupType, PersistentContainer } from './model';
import { PartyModification } from '../damsel/payment-processing';
import {
    getModificationGroupType, getmodificationType,
    toContractModificationName,
    toShopModificationName
} from './party-modification-group-converter';
import { UnitName } from '../party-modification-creation/unit-name';

@Injectable()
export class PersistentContainerService {
    containers$: Subject<PersistentContainer[]> = new Subject();
    private containers: PersistentContainer[] = [];

    addContainer(modification: PartyModification, saved = true) {
        const typeHash = this.makeTypeHash(modification);
        if (this.containers.find((container: PersistentContainer) => container.typeHash === typeHash)) {
            this.removeContainer(typeHash);
        }
        this.containers.push({
            modification,
            saved,
            typeHash
        });
        this.containers$.next(this.containers);
    }

    removeContainer(typeHash: string) {
        remove(this.containers, (container: PersistentContainer) => container.typeHash === typeHash);
        this.containers$.next(this.containers);
    }

    private makeTypeHash(modification: PartyModification): string {
        switch (getmodificationType(modification)) {
            case UnitName.shopModification:
                return modification.shopModification.id + toShopModificationName(modification.shopModification.modification);
            case UnitName.contractModification:
                return modification.contractModification.id + toContractModificationName(modification.contractModification.modification);

        }
    }
}
