import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { ClaimService } from '../claim.service';
import { ClaimInfoContainer } from '../model';
import { AcceptClaimComponent } from '../accept-claim/accept-claim.component';
import { DenyClaimComponent } from '../deny-claim/deny-claim.component';
import { ClaimActionType } from '../claim-action-type';
import { UnitActionsComponent } from '../unit-actions/unit-actions.component';
import { NewClaimComponent } from '../new-claim/new-claim.component';
import { ClaimStatus } from '../../papi/model/claim-statuses';

@Component({
    selector: 'cc-claim-info',
    templateUrl: 'claim-info.component.html'
})
export class ClaimInfoComponent implements OnInit {
    claimInfoContainer: ClaimInfoContainer;
    isLoading = false;
    partyID: string;
    claimID: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private claimService: ClaimService,
        private bottomSheet: MatBottomSheet,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.claimService.claimInfoContainer$.subscribe(container => {
            if (container) {
                this.claimInfoContainer = container;
                this.partyID = container.partyId;
                this.claimID = container.claimId;
            }
        });
    }

    hasUnsavedChanges() {
        return this.claimService.hasUnsavedChanges();
    }

    save() {
        this.isLoading = true;
        switch (this.claimInfoContainer.type) {
            case ClaimActionType.edit:
                this.claimService
                    .saveChanges()
                    .subscribe(() => this.success(), e => this.failed(e));
                break;
            case ClaimActionType.create:
                this.claimService.createClaim().subscribe(
                    claimInfo => {
                        const editEndpoint = `/claims/${claimInfo.partyId}/${
                            ClaimActionType.edit
                        }/${claimInfo.claimId}`;
                        this.router.navigate([editEndpoint]).then(() => this.success());
                    },
                    e => this.failed(e)
                );
                break;
        }
    }

    addAvailable() {
        switch (this.claimInfoContainer.type) {
            case ClaimActionType.edit:
                return this.claimInfoContainer.status === ClaimStatus.pending;
            case ClaimActionType.create:
                return true;
        }
        return false;
    }

    add() {
        this.bottomSheet.open(UnitActionsComponent, { data: { type: 'allActions' } });
    }

    newClaim() {
        this.dialog.open(NewClaimComponent, {
            disableClose: true,
            data: { partyID: this.partyID, claimID: this.claimID }
        });
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

    private success() {
        this.isLoading = false;
        this.snackBar.open('Changes saved', 'OK', { duration: 3000 });
    }

    private failed(error) {
        console.error(error);
        this.isLoading = false;
        this.snackBar.open('An error occurred', 'OK');
    }
}
