import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, shareReplay } from 'rxjs/operators';
import Int64 from 'thrift-ts/lib/int64';

import { SHARE_REPLAY_CONF } from '../../shared/share-replay-conf';
import { PartyClaimService } from './party-claim.service';

@Component({
    templateUrl: 'party-claim.component.html',
    providers: [PartyClaimService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyClaimComponent implements OnInit {
    claimID$ = this.route.params.pipe(pluck('claimID'), shareReplay(SHARE_REPLAY_CONF));
    isLoading$ = this.partyClaimService.isLoading$;
    claim$ = this.partyClaimService.claim$;

    constructor(private route: ActivatedRoute, private partyClaimService: PartyClaimService) {}

    ngOnInit(): void {
        this.partyClaimService.getClaim();
    }
}
