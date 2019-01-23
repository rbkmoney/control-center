import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

import { Party, Shop } from '../gen-damsel/domain';
import { PartyService } from './party.service';

@Component({
    templateUrl: 'party.component.html',
    styleUrls: ['../shared/container.css', 'party.component.css']
})
export class PartyComponent implements OnInit {
    party$: Observable<Party>;
    shops$: Observable<Shop[]>;
    isLoading = false;

    party: Party;

    private partyID: string;

    constructor(
        private partyService: PartyService,
        private route: ActivatedRoute
    ) // private snackBar: MatSnackBar
    {
        this.route.params.subscribe(params => {
            this.partyID = params['partyId'];
        });
    }

    ngOnInit(): void {
        this.party$ = this.partyService.getParty(this.partyID);
        this.shops$ = this.partyService.getShops(this.partyID);
    }

    // private initialize() {
    //     this.isLoading = true;
    //     this.partyService.getParty(this.partyID).subscribe(
    //         () => {
    //             this.isLoading = false;
    //         },
    //         err => {
    //             this.isLoading = false;
    //             this.snackBar
    //                 .open(`An error occurred while initializing: ${err}`, 'RETRY')
    //                 .onAction()
    //                 .subscribe(() => this.initialize());
    //         }
    //     );
    // }
}
