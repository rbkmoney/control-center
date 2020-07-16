import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { PartyService } from '../../papi/party.service';
import { Party } from '../../thrift-services/damsel/gen-model/domain';

@Injectable()
export class PartyShopsService {
    private party$: Observable<Party> = this.route.params.pipe(
        pluck('partyID'),
        switchMap((partyID) => this.partyService.getParty(partyID)),
        shareReplay(1)
    );

    shops$ = this.party$.pipe(
        pluck('shops'),
        map((shops) => Array.from(shops.values()))
    );

    constructor(private partyService: PartyService, private route: ActivatedRoute) {}
}
