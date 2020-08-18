import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SearchFormValue } from '../claim-search-form';
import { PartyPaymentsService } from './party-payments.service';

@Component({
    templateUrl: 'party-payments.component.html',
    providers: [PartyPaymentsService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyPaymentsComponent implements OnInit {
    doAction$ = this.partyClaimsService.doAction$;
    payments$ = this.partyClaimsService.searchResult$;
    hasMore$ = this.partyClaimsService.hasMore$;

    constructor(
        private partyClaimsService: PartyPaymentsService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
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
        console.log(v)
        this.partyClaimsService.search(v as any);
    }

}
