import { Injectable } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { PartyService } from '../../../../papi/party.service';
import { ContractID, PartyID } from '../../../../thrift-services/damsel/gen-model/domain';

@Injectable()
export class FetchContractorService {
    private getContractor$ = new Subject<{ partyID: PartyID; contractID: ContractID }>();

    contractor$ = this.getContractor$.pipe(
        switchMap(({ partyID, contractID }) =>
            combineLatest([
                this.partyService.getParty(partyID),
                this.partyService.getContract(partyID, contractID),
            ])
        ),
        map(([party, contract]) => party.contractors.get(contract.contractor_id)),
        pluck('contractor'),
        shareReplay(1)
    );

    constructor(private partyService: PartyService) {
        this.contractor$.subscribe();
    }

    getContractor(params: { partyID: PartyID; contractID: ContractID }) {
        this.getContractor$.next(params);
    }
}
