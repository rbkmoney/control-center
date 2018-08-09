import { Component, OnInit } from '@angular/core';

import { ClaimService } from '../claim.service';
import { ClaimInfoContainer } from '../model';

@Component({
    selector: 'cc-claim-info',
    templateUrl: 'claim.info.component.html'
})
export class ClaimInfoComponent implements OnInit {

    claimInfoContainer: ClaimInfoContainer;

    constructor(private claimService: ClaimService) {
    }

    ngOnInit() {
        this.claimService.$claimInfoContainer.subscribe((container) => {
            this.claimInfoContainer = container;
        });
    }
}
