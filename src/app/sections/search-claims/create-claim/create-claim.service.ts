import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ClaimManagementService } from '../../../thrift-services/damsel/claim-management.service';
import { CreateClaimService as CreateClaimServiceGeneric } from '../../create-claim.service';

@Injectable()
export class CreateClaimService extends CreateClaimServiceGeneric {
    form = this.fb.group({
        partyId: ['', Validators.required],
    });

    constructor(
        claimService: ClaimManagementService,
        snackBar: MatSnackBar,
        private fb: FormBuilder
    ) {
        super(claimService, snackBar);
    }

    createClaim() {
        const { partyId } = this.form.value;
        this.claimCreation$.next(partyId);
    }
}
