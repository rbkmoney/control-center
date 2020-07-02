import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, shareReplay } from 'rxjs/operators';

import { SHARE_REPLAY_CONF } from '../../shared/share-replay-conf';
import { testClaim } from './test-claim';

@Component({
    templateUrl: 'party-claim.component.html',
})
export class PartyClaimComponent {
    claimID$ = this.route.params.pipe(pluck('claimID'), shareReplay(SHARE_REPLAY_CONF));

    testClaim = testClaim();

    constructor(private route: ActivatedRoute) {}
}
