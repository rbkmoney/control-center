import { Injectable } from '@angular/core';
import { PartyService } from '../../../../../papi/party.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { SelectableItem } from './selectable-item';

@Injectable()
export class ContractorSelectorService {
    constructor(private partyService: PartyService) {}

    getSelectableItems(partyID: string): Observable<SelectableItem[]> {
        return this.partyService.getParty(partyID).pipe(
            map((party) => {
                const result = [];
                party.contractors.forEach((item, id) => result.push({ item, id }));
                return result;
            })
        );
    }
}
