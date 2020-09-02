import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, shareReplay } from 'rxjs/operators';

import { SHARE_REPLAY_CONF } from '../../shared/share-replay-conf';
import { FetchClaimService } from './fetch-claim.service';

@Component({
    templateUrl: 'party-claim.component.html',
    providers: [FetchClaimService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyClaimComponent implements OnInit {
    claimID$ = this.route.params.pipe(pluck('claimID'), shareReplay(SHARE_REPLAY_CONF));
    partyID$ = this.route.params.pipe(pluck('partyID'), shareReplay(SHARE_REPLAY_CONF));
    isLoading$ = this.fetchClaimService.isLoading$;
    createdAt$ = this.fetchClaimService.claim$.pipe(pluck('created_at'));
    changeset$ = this.fetchClaimService.claim$.pipe(pluck('changeset'));
    status$ = this.fetchClaimService.claim$.pipe(pluck('status'));

    constructor(private route: ActivatedRoute, private fetchClaimService: FetchClaimService) {}

    ngOnInit(): void {
        this.fetchClaimService.getClaim();
    }

    changesetUpdated() {
        this.fetchClaimService.getClaim();
    }
}
