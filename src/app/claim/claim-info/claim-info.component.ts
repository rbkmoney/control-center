import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { ClaimService } from '../claim.service';
import { ClaimInfoContainer } from '../model';
import { AcceptClaimComponent } from '../accept-claim/accept-claim.component';
import { DenyClaimComponent } from '../deny-claim/deny-claim.component';
import { ClaimActionType } from '../claim-action-type';
import { UnitActionsComponent } from '../unit-actions/unit-actions.component';
import { CloneClaimComponent } from '../clone-claim/clone-claim.component';

@Component({
    selector: 'cc-claim-info',
    templateUrl: 'claim-info.component.html'
})
export class ClaimInfoComponent implements OnInit {
    claimInfoContainer: ClaimInfoContainer;
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
        this.claimService.claimInfoContainer$
            .pipe(filter(container => container !== null))
            .subscribe(container => {
                this.claimInfoContainer = container;
                this.partyID = container.party_id;
                this.claimID = container.claim_id;
            });
    }

    hasUnsavedChanges() {
        return this.claimService.hasUnsavedChanges();
    }

    save() {
        switch (this.claimInfoContainer.type) {
            case ClaimActionType.edit:
                this.claimService
                    .saveChanges()
                    .subscribe(() => this.success(), e => this.failed(e));
                break;
            case ClaimActionType.create:
                this.claimService.createClaim().subscribe(
                    claimInfo => {
                        const editEndpoint = `/claims/${claimInfo.party_id}/${
                            ClaimActionType.edit
                        }/${claimInfo.party_id}`;
                        this.router.navigate([editEndpoint]).then(() => this.success());
                    },
                    e => this.failed(e)
                );
                break;
        }
    }

    add() {
        this.bottomSheet.open(UnitActionsComponent, { data: { type: 'allActions' } });
    }

    cloneClaim() {
        this.dialog.open(CloneClaimComponent, {
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
        this.snackBar.open('Changes saved', 'OK', { duration: 3000 });
    }

    private failed(error) {
        console.error(error);
        this.snackBar.open('An error occurred', 'OK');
    }
}
