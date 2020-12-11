import { Injectable } from '@angular/core';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { forkJoin, merge, Observable, of, Subject } from 'rxjs';
import { catchError, filter, map, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { PartyService } from '../../../../papi/party.service';
import { ContractID, PartyID } from '../../../../thrift-services/damsel/gen-model/domain';

@Injectable()
export class FetchContractorService {
    private getContractor$ = new Subject<{ partyID: PartyID; contractID: ContractID }>();
    private hasError$ = new Subject();

    contractor$ = this.getContractor$.pipe(
        switchMap(
            ({ partyID, contractID }): Observable<[ContractID, any]> =>
                forkJoin([
                    of(contractID),
                    this.partyService.getParty(partyID).pipe(
                        catchError(() => {
                            this.hasError$.next();
                            return of('error');
                        }),
                        filter((result) => result !== 'error')
                    ),
                ])
        ),
        map(([contractID, party]) => {
            const contractorID = party.contracts.get(contractID)?.contractor_id;
            return party.contractors.get(contractorID)?.contractor;
        }),
        shareReplay(1)
    );

    inProgress$ = progress(this.getContractor$, merge(this.contractor$, this.hasError$)).pipe(
        startWith(true)
    );

    constructor(private partyService: PartyService) {
        this.contractor$.subscribe();
    }

    getContractor(params: { partyID: PartyID; contractID: ContractID }) {
        this.getContractor$.next(params);
    }
}
