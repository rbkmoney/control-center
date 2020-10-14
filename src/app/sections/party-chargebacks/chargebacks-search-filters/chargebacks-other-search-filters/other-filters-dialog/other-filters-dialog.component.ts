import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
    chargebackCategories,
    ChargebacksParams,
    chargebackStages,
    chargebackStatuses,
} from '../../../../../query-dsl';

@Component({
    templateUrl: 'other-filters-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtherFiltersDialogComponent {
    chargebackStatuses = chargebackStatuses;
    chargebackCategories = chargebackCategories;
    chargebackStages = chargebackStages;

    form = this.fb.group({
        chargeback_statuses: '',
        chargeback_categories: '',
        chargeback_stages: '',
    });

    constructor(
        private dialogRef: MatDialogRef<OtherFiltersDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public initParams: ChargebacksParams,
        private fb: FormBuilder
    ) {
        this.form.patchValue(this.initParams);
    }

    cancel() {
        this.dialogRef.close();
    }

    save() {
        this.dialogRef.close(this.form.value);
    }
}
