import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Party, Shop } from '../gen-damsel/domain';
import { PartyService as PapiPartyService } from '../papi/party.service';

@Injectable()
export class PartyService {
    party$: Subject<Party> = new BehaviorSubject(null);
    shops$: Subject<Shop[]> = new BehaviorSubject(null);

    constructor(private papiPartyService: PapiPartyService) {}

    initialize(partyID: string): Observable<Party> {
        return this.papiPartyService.getParty(partyID).pipe(
            tap(party => {
                this.party$.next(party);
                this.shops$.next(Array.from(party.shops.values()));
            })
        );
    }
}
