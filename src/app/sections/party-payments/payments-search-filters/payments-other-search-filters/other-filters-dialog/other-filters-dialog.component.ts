import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { removeEmptyProperties } from '../../../../../shared/utils';
import { paymentMethods, paymentStatuses, paymentSystems, tokenProviders } from './constants';
import { OtherFiltersDialogService } from './other-filters-dialog.service';

@Component({
    templateUrl: 'other-filters-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtherFiltersDialogComponent {
    paymentStatuses = paymentStatuses;
    paymentMethods = paymentMethods;
    tokenProviders = tokenProviders;
    paymentSystems = paymentSystems;

    currentDomainVersion$ = this.paymentsOtherSearchFiltersService.currentDomainVersion$;

    constructor(
        private dialogRef: MatDialogRef<OtherFiltersDialogComponent>,
        private paymentsOtherSearchFiltersService: OtherFiltersDialogService,
        @Inject(MAT_DIALOG_DATA) public form: FormGroup
    ) {}

    cancel() {
        this.dialogRef.close();
    }

    save() {
        this.dialogRef.close(removeEmptyProperties(this.form.value));
    }
}
