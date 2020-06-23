import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, pluck, shareReplay } from 'rxjs/operators';

import { SHARE_REPLAY_CONF } from '../../shared/share-replay-conf';

@Component({
    templateUrl: 'party.component.html',
    styleUrls: ['party.component.scss'],
})
export class PartyComponent {
    links = [
        { name: 'Claims', url: 'claims' },
        { name: 'Shops', url: 'shops' },
    ];

    partyID$ = this.route.params.pipe(pluck('partyID'), shareReplay(SHARE_REPLAY_CONF));
    hasClaimID$ = this.route.firstChild.params.pipe(
        pluck('claimID'),
        map((claimID) => !!claimID),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(private route: ActivatedRoute) {}
}
