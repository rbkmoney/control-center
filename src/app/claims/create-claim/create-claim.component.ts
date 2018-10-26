import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { CreateClaimService } from './create-claim.service';

@Component({
    templateUrl: 'create-claim.component.html',
    providers: [CreateClaimService]
})
export class CreateClaimComponent implements OnInit {
    form: FormGroup;
    isLoading: boolean;

    constructor(private dialogRef: MatDialogRef<CreateClaimComponent>,
                private createPayoutService: CreateClaimService,
                private router: Router) {
    }

    ngOnInit() {
        this.form = this.createPayoutService.createClaimGroup;
    }

    submit() {
        if (this.form.valid) {
            this.close();
            this.router.navigate([`/claims/${this.form.value.partyId}/create`]);
        }
    }

    close() {
        this.dialogRef.close();
    }
}