import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { PartyService } from '../party/party.service';
import { PartiesService } from './parties.service';

@Component({
    templateUrl: 'parties.component.html',
    styleUrls: [],
    providers: [PartiesService, PartyService],
})
export class PartiesComponent implements OnInit {
    public form: FormGroup;
    isLoading = false;

    constructor(
        private partiesService: PartiesService,
        private partyService: PartyService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.form = this.partiesService.form;
    }

    goToParty() {
        this.isLoading = true;
        let { partyId } = this.form.value;
        partyId = partyId.trim();
        this.partyService.getParty(partyId).subscribe(
            () => {
                this.isLoading = false;
                this.router.navigate(['party', partyId]);
            },
            () => {
                this.isLoading = false;
                this.snackBar
                    .open(`An error occurred while receiving party`, 'RETRY')
                    .onAction()
                    .subscribe(() => this.goToParty());
            }
        );
    }
}
