import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { PartyService } from '../papi/party.service';
import { Party } from '../damsel/domain';

@Component({
    templateUrl: 'party.component.html',
    styleUrls: ['../shared/container.css']
})
export class PartyComponent implements OnInit {

    party: Party;
    isLoading = false;

    private partyId: string;

    constructor(private papiPartyService: PartyService,
                private route: ActivatedRoute,
                private snackBar: MatSnackBar) {
        this.route.params.subscribe((params) => {
            this.partyId = params['partyId'];
        });
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.papiPartyService.getParty(this.partyId).subscribe((party) => {
            this.isLoading = false;
            this.party = party;
        }, (error) => {
            this.isLoading = false;
            this.snackBar.open(`${error.status}: ${error.message}`, 'OK', {
                duration: 1500
            });
        });
    }
}
