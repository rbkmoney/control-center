import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

    form = this.fb.group({ kek: '' });

    constructor(
        private fb: FormBuilder,
        private partyClaimsService: PartyPaymentsService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.form.controls.kek.valueChanges.subscribe((k) => console.log('kek', k));
        this.partyClaimsService.errors$.subscribe((e) =>
            this.snackBar.open(`An error occurred while search claim (${e})`, 'OK')
        );
    }

    fetchMore() {
        this.partyClaimsService.fetchMore();
    }

    search(v: SearchFormValue) {
        this.partyClaimsService.search(v as any);
    }
}
