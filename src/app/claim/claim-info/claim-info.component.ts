import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { ClaimService } from '../claim.service';
import { ClaimInfoContainer } from '../model';
import { AcceptClaimComponent } from '../accept-claim/accept-claim.component';
import { DenyClaimComponent } from '../deny-claim/deny-claim.component';
import { UnitActionsComponent } from '../unit-actions/unit-actions.component';
import { ClaimStatus } from '../../papi/model/claim-statuses';

@Component({
    selector: 'cc-claim-info',
    templateUrl: 'claim-info.component.html'
})
export class ClaimInfoComponent implements OnInit {

    claimInfoContainer: ClaimInfoContainer;
    isLoading = false;
    private claimId: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private claimService: ClaimService,
                private bottomSheet: MatBottomSheet,
                private snackBar: MatSnackBar,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.claimService.claimInfoContainer$.subscribe((container) => {
            this.claimInfoContainer = container;
        });
        this.route.params.subscribe((params) => {
            const {claimId, partyId} = params;
            this.claimId = claimId;
            if (claimId === 'create') {
                this.claimService.mockClaimInfoContainer({partyId});
            }
        });
    }

    createChange() {
        this.bottomSheet.open(UnitActionsComponent);
    }

    saveModifications() {
        this.isLoading = true;
        if (this.claimId === 'create') {
            this.claimService.createClaim()
                .subscribe((claimInfo) => {
                    this.router.navigate([`/claims/${claimInfo.partyId}/${claimInfo.claimId}`]);
                    this.success();
                }, (e) => this.failed(e));
        } else {
            this.claimService.saveChanges()
                .subscribe(() => this.success(), (e) => this.failed(e));
        }
    }

    hasUnsavedChanges() {
        return this.claimService.hasUnsavedChanges();
    }

    isCanCreateModifications() {
        return (!this.isLoading && this.claimInfoContainer.status === ClaimStatus.pending) || (!this.isLoading && !this.claimInfoContainer.status);
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
        this.snackBar.open('Changes saved', 'OK', {duration: 3000});
    }

    private failed(error) {
        console.error(error);
        this.isLoading = false;
        this.snackBar.open(`An error occurred while creating ${name}`, 'OK');
    }
}
