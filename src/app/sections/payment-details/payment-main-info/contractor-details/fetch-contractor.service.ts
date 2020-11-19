import { Injectable } from '@angular/core';
import { forkJoin, of, Subject } from 'rxjs';
import { pluck, shareReplay, switchMap } from 'rxjs/operators';

import { PartyService } from '../../../../papi/party.service';
import { ContractID, PartyID } from '../../../../thrift-services/damsel/gen-model/domain';

@Injectable()
export class FetchContractorService {
    private getContractor$ = new Subject<{ partyID: PartyID; contractID: ContractID }>();

    contractor$ = this.getContractor$.pipe(
        switchMap(({ partyID, contractID }) =>
            forkJoin([of(partyID), this.partyService.getContract(partyID, contractID)])
        ),
        switchMap(([partyID, { contractor_id }]) =>
            this.partyService.getContractor(partyID, contractor_id)
        ),
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
