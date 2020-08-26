import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { removeEmptyProperties } from '../../../../shared/utils';
import { clearQueryParams } from '../clear-query-params';
import { paymentMethods, paymentStatuses, paymentSystems, tokenProviders } from './constants';
import { FilterDialogValue } from './filter-dialog-value';

@Component({
    templateUrl: 'other-filters-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtherFiltersDialogComponent {
    paymentStatuses = paymentStatuses;
    paymentMethods = paymentMethods;
    tokenProviders = tokenProviders;
    paymentSystems = paymentSystems;

    count;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialogRef: MatDialogRef<OtherFiltersDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public form: FormGroup
    ) {}

    cancel() {
        this.dialogRef.close({ action: 'cancel' } as FilterDialogValue);
    }

    save() {
        this.route.queryParams.pipe(take(1)).subscribe((params) => {
            const cleanParams = clearQueryParams(params, Object.keys(this.form.value));
            this.router.navigate([location.pathname], {
                queryParams: { ...cleanParams, ...removeEmptyProperties(this.form.value) },
            });
            this.dialogRef.close();
        });
    }
}
