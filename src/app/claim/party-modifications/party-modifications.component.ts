import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, first, shareReplay } from 'rxjs/operators';

import { ClaimService } from '../claim.service';
import { ModificationGroupType, PartyModificationUnit } from '../model';

@Component({
    selector: 'cc-party-modifications',
    templateUrl: 'party-modifications.component.html'
})
export class PartyModificationsComponent implements OnInit {
    shopUnits: PartyModificationUnit[] = [];

    contractUnits: PartyModificationUnit[] = [];

    partyID$: Observable<string> = this.route.params.pipe(
        pluck('party_id'),
        first(),
        shareReplay(1)
    );

    constructor(
        private claimService: ClaimService,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.claimService.modificationGroups$.subscribe(groups => {
            this.shopUnits = [];
            this.contractUnits = [];
            for (const group of groups) {
                switch (group.type) {
                    case ModificationGroupType.ShopUnitContainer:
                        this.shopUnits = this.shopUnits.concat(group.units);
                        break;
                    case ModificationGroupType.ContractUnitContainer:
                        this.contractUnits = this.contractUnits.concat(group.units);
                        break;
                    case ModificationGroupType.unknown:
                        this.snackBar.open('Detected unknown party modification unit', 'OK');
                        break;
                }
            }
        });
    }
}
