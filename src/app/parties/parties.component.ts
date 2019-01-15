import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { PartiesService } from './parties.service';
import { PartyService } from '../party/party.service';
import { MatSnackBar } from '@angular/material';

@Component({
    templateUrl: 'parties.component.html',
    styleUrls: ['../shared/container.css'],
    providers: [PartiesService, PartyService]
})
export class PartiesComponent implements OnInit {

    public form: FormGroup;
    isLoading = false;

    constructor(private partiesService: PartiesService,
                private partyService: PartyService,
                private snackBar: MatSnackBar,
                private router: Router) {
    }

    ngOnInit(): void {
        this.form = this.partiesService.form;
    }

    goToParty() {
        this.isLoading = true;
        let { partyId } = this.form.value;
        partyId = partyId.trim();
        this.partyService.initialize(partyId).subscribe(() => {
            this.isLoading = false;
            this.router.navigate(['party', partyId]);
        }, (err) => {
            this.isLoading = false;
            this.snackBar
                .open(`An error occurred while initializing: ${ err }`, 'RETRY')
                .onAction()
                .subscribe(() => this.goToParty());
        });
    }
}
