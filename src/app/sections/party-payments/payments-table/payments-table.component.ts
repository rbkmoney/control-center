import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Claim, ClaimID } from '../../../thrift-services/damsel/gen-model/claim_management';
import { PartyID, Shop } from '../../../thrift-services/damsel/gen-model/domain';
import { StatPayment } from '../../../thrift-services/damsel/gen-model/merch_stat';
import { PartyService } from '../../../party/party.service';
import { Observable } from 'rxjs';
import { pluck, shareReplay, switchMap } from 'rxjs/operators';

@Component({
    selector: 'cc-payments-table',
    templateUrl: 'payments-table.component.html',
    styleUrls: ['payments-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsTableComponent {
    @Input()
    payments: StatPayment[];

    private partyID$ = this.route.params.pipe(pluck('partyID'), shareReplay(1));

    displayedColumns: string[] = ['amount', 'status', 'createdAt', 'shop', 'actions'];

    constructor(private router: Router, private route: ActivatedRoute, private partyService: PartyService) {}

    navigateToPayment(partyID: PartyID, claimID: ClaimID) {
        this.router.navigate([`/party/${partyID}/claim/${claimID}`]);
    }

    navigateToDeprecatedClaim(partyID: PartyID, claimID: ClaimID) {
        this.router.navigate([`/claim-mgt/party/${partyID}/claim/${claimID}`]);
    }

    getShop(id: string): Observable<Shop> {
        return this.partyID$.pipe(
            switchMap(partyID => this.partyService.getShop(partyID, id))
        );
    }
}
