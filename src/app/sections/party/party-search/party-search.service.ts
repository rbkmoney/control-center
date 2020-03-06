import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PartyService } from '../../../papi/party.service';

@Injectable()
export class PartySearchService {
    form: FormGroup;
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
        private router: Router,
        private partyService: PartyService
    ) {
        this.form = this.prepareForm();
    }

    goToParty() {
        this.isLoading = true;
        let { partyId } = this.form.value;
        partyId = partyId.trim();
        this.partyService.getParty(partyId).subscribe(
            () => {
                this.isLoading = false;
                this.router.navigate(['party', partyId, 'claims']);
            },
            err => {
                console.log(err);
                this.isLoading = false;
                this.snackBar
                    .open(`An error occurred while getting the party: ${err}`, 'RETRY')
                    .onAction()
                    .subscribe(() => this.goToParty());
            }
        );
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            partyId: ['', Validators.required]
        });
    }
}
