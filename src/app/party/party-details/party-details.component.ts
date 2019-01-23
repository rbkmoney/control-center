import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Party, Shop } from '../../gen-damsel/domain';
import { PartyService } from '../party.service';

@Component({
    templateUrl: 'party-details.component.html'
})
export class PartyDetailsComponent implements OnInit {

    party$: Observable<Party>;
    shops$: Observable<Shop[]>;

    @Input()
    party: Party;

    private partyID: string;

    constructor(
        private partyService: PartyService,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe(params => {
            this.partyID = params['partyId'];
        });
    }

    ngOnInit(): void {
        this.party$ = this.partyService.getParty(this.partyID);
        this.shops$ = this.partyService.getShops(this.partyID);
    }
}
