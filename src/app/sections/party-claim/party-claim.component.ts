import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, shareReplay } from 'rxjs/operators';

import { ClaimService } from '../../claim-mgt/claim/claim.service';
import { RecreateClaimService } from '../../claim-mgt/claim/recreate-claim';
import { SHARE_REPLAY_CONF } from '../../shared/share-replay-conf';

@Component({
    templateUrl: 'party-claim.component.html',
})
export class PartyClaimComponent {
    claimID$ = this.route.params.pipe(pluck('claimID'), shareReplay(SHARE_REPLAY_CONF));

    constructor(private route: ActivatedRoute) {}
}
