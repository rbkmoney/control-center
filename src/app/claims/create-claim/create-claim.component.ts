import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ClaimActionType } from '../../claim/claim-action-type';

@Component({
    templateUrl: 'create-claim.component.html',
})
export class CreateClaimComponent implements OnInit {
    form: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<CreateClaimComponent>,
        private router: Router,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.form = this.fb.group({
            partyId: ['', Validators.required],
        });
    }

    submit() {
        const partyId = this.form.value.partyId.trim();
        this.dialogRef.close();
        this.router.navigate([`/claims/${partyId}/${ClaimActionType.create}`]);
    }
}
