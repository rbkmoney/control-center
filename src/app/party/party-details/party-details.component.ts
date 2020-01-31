import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';

import { Party, Shop } from '../../thrift-services/damsel/gen-model/domain';
import { PartyService } from '../party.service';

@Component({
    templateUrl: 'party-details.component.html',
    styleUrls: []
})
export class PartyDetailsComponent implements OnInit {
    party: Party;
    shops: Shop[];
    isLoading = false;

    private partyID: string;

    constructor(private partyService: PartyService, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.partyID = params['partyID'];
        });
    }

    ngOnInit(): void {
        this.isLoading = true;
        combineLatest(
            this.partyService.getParty(this.partyID),
            this.partyService.getShops(this.partyID)
        ).subscribe(([party, shops]) => {
            this.isLoading = false;
            this.party = party;
            this.shops = shops;
        });
    }
}
