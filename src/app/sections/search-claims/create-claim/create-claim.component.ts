import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { fromPromise } from 'rxjs/internal-compatibility';
import { switchMap, tap } from 'rxjs/operators';

import { CreateClaimService } from './create-claim.service';

@Component({
    templateUrl: 'create-claim.component.html',
    providers: [CreateClaimService],
})
export class CreateClaimComponent implements OnInit {
    form = this.createClaimService.form;
    isLoading$ = this.createClaimService.inProgress$;

    private claim$ = this.createClaimService.claim$;

    constructor(
        private dialogRef: MatDialogRef<CreateClaimComponent>,
        private router: Router,
        private createClaimService: CreateClaimService
    ) {}

    ngOnInit(): void {
        this.claim$
            .pipe(
                tap((q) => console.log(q)),
                switchMap((claim) =>
                    fromPromise(
                        this.router.navigate([
                            `claim-mgt/party/${claim.party_id}/claim/${claim.id}`,
                        ])
                    )
                )
            )
            .subscribe(() => {
                this.dialogRef.close();
            });
    }

    submit() {
        this.createClaimService.createClaim();
    }
}
