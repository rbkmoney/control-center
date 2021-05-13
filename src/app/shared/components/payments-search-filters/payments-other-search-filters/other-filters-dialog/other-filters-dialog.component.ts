import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SearchFiltersParams } from '../../search-filters-params';
import { PAYMENT_METHODS, PAYMENT_STATUSES, PAYMENT_SYSTEMS, TOKEN_PROVIDERS } from './constants';
import { OtherFiltersDialogService } from './other-filters-dialog.service';

@Component({
    templateUrl: 'other-filters-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtherFiltersDialogComponent implements OnInit {
    paymentStatuses = PAYMENT_STATUSES;
    paymentMethods = PAYMENT_METHODS;
    tokenProviders = TOKEN_PROVIDERS;
    paymentSystems = PAYMENT_SYSTEMS;

    currentDomainVersion$ = this.paymentsOtherSearchFiltersService.currentDomainVersion$;
    form = this.paymentsOtherSearchFiltersService.form;

    constructor(
        private dialogRef: MatDialogRef<OtherFiltersDialogComponent>,
        private paymentsOtherSearchFiltersService: OtherFiltersDialogService,
        @Inject(MAT_DIALOG_DATA) public initParams: SearchFiltersParams
    ) {}

    ngOnInit() {
        this.form.patchValue(this.initParams);
    }

    cancel() {
        this.dialogRef.close();
    }

    save() {
        this.dialogRef.close(this.form.value);
    }
}
