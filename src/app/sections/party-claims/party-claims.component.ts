import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

import { ClaimManagementService } from '../../thrift-services/damsel/claim-management.service';
import { SearchFormValue } from '../claim-search-form';
import { CreateClaimService } from './create-claim.service';
import { PartyClaimsService } from './party-claims.service';

@Component({
    templateUrl: 'party-claims.component.html',
    providers: [PartyClaimsService, CreateClaimService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyClaimsComponent implements OnInit {
    doAction$ = this.partyClaimsService.doAction$;
    claims$ = this.partyClaimsService.searchResult$;
    hasMore$ = this.partyClaimsService.hasMore$;

    constructor(
        private partyClaimsService: PartyClaimsService,
        private snackBar: MatSnackBar,
        private router: Router,
        private route: ActivatedRoute,
        private claimService: ClaimManagementService
    ) {}

    ngOnInit() {
        this.partyClaimsService.errors$.subscribe((e) =>
            this.snackBar.open(`An error occurred while search claim (${e})`, 'OK')
        );
    }

    fetchMore() {
        this.partyClaimsService.fetchMore();
    }

    search(v: SearchFormValue) {
        this.partyClaimsService.search(v);
    }

    createClaim() {
        this.route.params
            .pipe(
                pluck('partyID'),
                switchMap((partyID) =>
                    forkJoin([of(partyID), this.claimService.createClaim(partyID, [])])
                )
            )
            .subscribe(([partyID, claim]) => {
                this.router.navigate([`claim-mgt/party/${partyID}/claim/${claim.id}`]);
            });
    }
}
