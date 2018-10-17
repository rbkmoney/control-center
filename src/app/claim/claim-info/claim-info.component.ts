import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatDialog, MatSnackBar } from '@angular/material';

import { ClaimService } from '../claim.service';
import { ClaimInfoContainer, PersistentContainer } from '../model';
import { AcceptClaimComponent } from '../accept-claim/accept-claim.component';
import { DenyClaimComponent } from '../deny-claim/deny-claim.component';
import { UnitActionsComponent } from '../unit-actions/unit-actions.component';
import { PersistentContainerService } from '../persistent-container.service';

@Component({
    selector: 'cc-claim-info',
    templateUrl: 'claim-info.component.html'
})
export class ClaimInfoComponent implements OnInit {

    claimInfoContainer: ClaimInfoContainer;
    isLoading = false;
    private containers: PersistentContainer[];

    constructor(private claimService: ClaimService,
                private persistentContainerService: PersistentContainerService,
                private bottomSheet: MatBottomSheet,
                private snackBar: MatSnackBar,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.claimService.claimInfoContainer$.subscribe((container) => {
            this.claimInfoContainer = container;
        });
        this.persistentContainerService.containers$.subscribe((containers) => {
            this.containers = containers;
        });
    }

    createChange() {
        this.bottomSheet.open(UnitActionsComponent);
    }

    saveModifications() {
        this.isLoading = true;
        this.claimService.createChange(this.containers
            .filter((container) => !container.saved)
            .map((container) => container.modification)).subscribe(() => this.success(), (e) => this.failed(e));
    }

    isUnsavedContainersExist() {
        return this.containers.filter((container) => !container.saved).length <= 0;
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
        this.snackBar.open(`${name} created`, 'OK', {duration: 3000});
    }

    private failed(error) {
        console.error(error);
        this.isLoading = false;
        this.snackBar.open(`An error occurred while creating ${name}`, 'OK');
    }
}
