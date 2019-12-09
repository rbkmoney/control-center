import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClaimService } from './claim.service';
import { switchMap } from 'rxjs/operators';

@Component({
    templateUrl: 'claim.component.html'
})
export class ClaimComponent {
    claim$ = this.claimService.claim$;

    constructor(private route: ActivatedRoute, private claimService: ClaimService) {
        this.route.params
            .pipe(
                switchMap(({ party_id, claim_id }) =>
                    this.claimService.getClaim(party_id, Number(claim_id))
                )
            )
            .subscribe();
    }
}
