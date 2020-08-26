import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PartyPaymentsService } from './party-payments.service';
import { PaymentsSearchParams } from './payments-search-params';

@Component({
    templateUrl: 'party-payments.component.html',
    providers: [PartyPaymentsService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyPaymentsComponent implements OnInit {
    doAction$ = this.partyPaymentsService.doAction$;
    payments$ = this.partyPaymentsService.searchResult$;
    hasMore$ = this.partyPaymentsService.hasMore$;

    constructor(
        private partyPaymentsService: PartyPaymentsService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.partyPaymentsService.errors$.subscribe((e) =>
            this.snackBar.open(`An error occurred while search payments (${e})`, 'OK')
        );
    }

    fetchMore() {
        this.partyPaymentsService.fetchMore();
    }

    search(v: PaymentsSearchParams) {
        this.partyPaymentsService.search(v);
    }
}
