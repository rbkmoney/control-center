import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchFormValue } from '@cc/app/shared/components';
import { ConfirmActionDialogComponent } from '@cc/components/confirm-action-dialog';
import { filter } from 'rxjs/operators';

import { CreateClaimService } from './create-claim.service';
import { PartyClaimsService } from './party-claims.service';

@Component({
    templateUrl: 'party-claims.component.html',
    providers: [PartyClaimsService, CreateClaimService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyClaimsComponent implements OnInit {
    doAction$ = this.partyClaimsService.doAction$;
    claims$ = this.partyClaimsService.searchResult$;
    hasMore$ = this.partyClaimsService.hasMore$;

    constructor(
        private partyClaimsService: PartyClaimsService,
        private snackBar: MatSnackBar,
        private createClaimService: CreateClaimService,
        private dialogRef: MatDialog
    ) {}

    ngOnInit() {
        this.partyClaimsService.errors$.subscribe((e) =>
            this.snackBar.open(`An error occurred while search claim (${e})`, 'OK')
        );
    }

    fetchMore() {
        this.partyClaimsService.fetchMore();
    }

    search(v: SearchFormValue) {
        this.partyClaimsService.search(v);
    }

    createClaim() {
        const dialog = this.dialogRef.open(ConfirmActionDialogComponent);
        dialog
            .afterClosed()
            .pipe(filter((r) => r === 'confirm'))
            .subscribe(() => {
                this.createClaimService.createClaim();
            });
    }
}
