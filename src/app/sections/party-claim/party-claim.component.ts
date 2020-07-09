import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, shareReplay } from 'rxjs/operators';
import Int64 from 'thrift-ts/lib/int64';

import { SHARE_REPLAY_CONF } from '../../shared/share-replay-conf';
import { Claim } from '../../thrift-services/damsel/gen-model/claim_management';

@Component({
    templateUrl: 'party-claim.component.html',
})
export class PartyClaimComponent {
    claimID$ = this.route.params.pipe(pluck('claimID'), shareReplay(SHARE_REPLAY_CONF));

    constructor(private route: ActivatedRoute) {}

    claim: Claim = {
        id: new Int64(123),
        party_id: '31123231231123123231321213',
        status: {
            review: {},
        },
        changeset: [],
        revision: 123,
        created_at: '2013-04-01T00:00:00.000',
    };
}
