import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

import { PartyService } from '../../papi/party.service';
import { SelectableItem } from './selectable-item';
import { PartyTarget } from '../party-target';
import { Contractor, Shop, Contract, Party } from '../../damsel/domain';

@Injectable()
export class PartyTargetService {

    constructor(private partyService: PartyService) {
    }

    getSelectableItems(partyID: string, targetName: PartyTarget): Observable<SelectableItem[]> {
        return this.partyService.getParty(partyID)
            .pipe(map((party) => {
                const result = [];
                const target = this.getTarget(party, targetName);
                target.forEach((value, key) => result.push({
                    id: key,
                    item: value,
                    checked: false
                }));
                return result;
            }));
    }

    private getTarget(party: Party, targetName: PartyTarget): Map<string, Contract | Shop | Contractor> {
        switch (targetName) {
            case PartyTarget.contract:
                return party.contracts;
            case PartyTarget.shop:
                return party.shops;
            case PartyTarget.contractor:
                return party.contractors;
        }
    }
}
