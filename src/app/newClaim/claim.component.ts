import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClaimService } from './claim.service';
import { MatSnackBar } from '@angular/material';
import { map, switchMap } from 'rxjs/operators';

@Component({
    templateUrl: 'claim.component.html',
    providers: [ClaimService]
})
export class ClaimComponent {
    claim$ = this.claimService.claim$;
    // .pipe(map(r => {
    //     console.log(r);
    //     return r;
    // }))

    constructor(
        private route: ActivatedRoute,
        private claimService: ClaimService,
        private snackBar: MatSnackBar
    ) {
        this.route.params.subscribe(params => {
            const { party_id, claim_id } = params;
            this.claimService.getClaim(party_id, Number(claim_id));
        });
    }
}
