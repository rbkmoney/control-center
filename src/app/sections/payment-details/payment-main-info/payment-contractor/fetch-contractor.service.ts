import { Injectable } from '@angular/core';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { forkJoin, merge, Observable, of, Subject } from 'rxjs';
import { catchError, filter, pluck, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { PartyService } from '../../../../papi/party.service';
import { ContractID, PartyID } from '../../../../thrift-services/damsel/gen-model/domain';

@Injectable()
export class FetchContractorService {
    private getContractor$ = new Subject<{ partyID: PartyID; contractID: ContractID }>();
    private hasError$ = new Subject();

    contractor$ = this.getContractor$.pipe(
        switchMap(
            ({ partyID, contractID }): Observable<[PartyID, any]> =>
                forkJoin([
                    of(partyID),
                    this.partyService.getContract(partyID, contractID).pipe(
                        catchError(() => {
                            this.hasError$.next();
                            return of('error');
                        }),
                        filter((result) => result !== 'error')
                    ),
                ])
        ),
        switchMap(([partyID, { contractor_id }]) =>
            this.partyService.getContractor(partyID, contractor_id).pipe(
                catchError(() => {
                    this.hasError$.next();
                    return of('error');
                }),
                filter((result) => result !== 'error')
            )
        ),
        pluck('contractor'),
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
