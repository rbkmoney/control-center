import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatDialog } from '@angular/material';

import { ClaimService } from '../claim.service';
import { ClaimInfoContainer } from '../model';
import { ClaimActionsComponent } from '../claim-actions/claim-actions.component';
import { AcceptClaimComponent } from '../accept-claim/accept-claim.component';
import { DenyClaimComponent } from '../deny-claim/deny-claim.component';

@Component({
    selector: 'cc-claim-info',
    templateUrl: 'claim.info.component.html'
})
export class ClaimInfoComponent implements OnInit {

    claimInfoContainer: ClaimInfoContainer;

    constructor(private claimService: ClaimService,
                private bottomSheet: MatBottomSheet,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.claimService.claimInfoContainer$.subscribe((container) => {
            this.claimInfoContainer = container;
        });
    }

    openClaimActions() {
        this.bottomSheet.open(ClaimActionsComponent);
    }

    accept() {
        this.dialog.open(AcceptClaimComponent, {
            disableClose: true
        });
    }

    deny() {
        this.dialog.open(DenyClaimComponent, {
            disableClose: true,
            width: '30vw'
        });
    }
}
