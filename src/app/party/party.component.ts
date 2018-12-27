import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PartyService } from '../papi/party.service';
import { Party } from '../damsel/domain';

@Component({
    templateUrl: 'party.component.html',
    styleUrls: ['../shared/container.css']
})
export class PartyComponent implements OnInit {

    party: Party;

    private partyId: string;

    constructor(private papiPartyService: PartyService,
                private route: ActivatedRoute) {
        this.route.params.subscribe((params) => {
            this.partyId = params['partyId'];
        });
    }

    ngOnInit(): void {
        this.papiPartyService.getParty(this.partyId).subscribe((party) => {
            this.party = party;
            console.log(party);
        })
    }
}
