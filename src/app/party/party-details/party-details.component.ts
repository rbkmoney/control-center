import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';

import { Party, Shop } from '../../gen-damsel/domain';
import { PartyService } from '../party.service';

@Component({
    templateUrl: 'party-details.component.html',
    styleUrls: ['../../shared/container.css']
})
export class PartyDetailsComponent implements OnInit {
    party$: Subject<Party> = new Subject();
    shops$: Subject<Shop[]> = new Subject();
    isLoading = false;

    private partyID: string;

    constructor(private partyService: PartyService, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.partyID = params['partyId'];
        });
    }

    ngOnInit(): void {
        this.isLoading = true;
        combineLatest(
            this.partyService.getParty(this.partyID),
            this.partyService.getShops(this.partyID)
        ).subscribe(([party, shops]) => {
            this.isLoading = false;
            this.party$.next(party);
            this.shops$.next(shops);
        });
    }
}
