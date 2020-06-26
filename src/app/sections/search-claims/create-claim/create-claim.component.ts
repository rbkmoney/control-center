import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { catchError, switchMap } from 'rxjs/operators';

import { ClaimManagementService } from '../../../thrift-services/damsel/claim-management.service';

@Component({
    templateUrl: 'create-claim.component.html',
})
export class CreateClaimComponent implements OnInit {
    form: FormGroup;
    isLoading$: boolean;

    constructor(
        private dialogRef: MatDialogRef<CreateClaimComponent>,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private claimService: ClaimManagementService
    ) {}

    ngOnInit() {
        this.form = this.fb.group({
            partyId: ['', Validators.required],
        });
    }

    submit() {
        const { partyId } = this.form.value;
        forkJoin([of(this.form.value.partyId), this.claimService.createClaim(partyId, [])])
            .pipe(
                switchMap(([partyID, claim]) =>
                    fromPromise(
                        this.router.navigate([`claim-mgt/party/${partyID}/claim/${claim.id}`])
                    )
                )
            )
            .subscribe(() => {
                this.dialogRef.close();
            });
    }
}
