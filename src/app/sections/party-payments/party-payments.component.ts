import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, shareReplay } from 'rxjs/operators';

@Component({
    templateUrl: 'party-payments.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyPaymentsComponent {
    partyID$ = this.route.params.pipe(pluck('partyID'), shareReplay(1));

    constructor(private route: ActivatedRoute) {}
}
