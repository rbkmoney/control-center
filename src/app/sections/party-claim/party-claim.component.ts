import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, shareReplay } from 'rxjs/operators';

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
    createdAt$ = this.partyClaimService.claim$.pipe(pluck('created_at'));
    changeset$ = this.partyClaimService.claim$.pipe(pluck('changeset'));
    status$ = this.partyClaimService.claim$.pipe(pluck('status'));

    constructor(private route: ActivatedRoute, private partyClaimService: PartyClaimService) {}

    ngOnInit(): void {
        this.partyClaimService.getClaim();
    }
}
