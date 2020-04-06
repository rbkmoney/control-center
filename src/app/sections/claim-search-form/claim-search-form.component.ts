import {
    Component,
    ChangeDetectionStrategy,
    OnInit,
    Output,
    EventEmitter,
    Input
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, map, take } from 'rxjs/operators';

import { removeEmptyProperties } from '../../shared/utils';
import { queryParamsToFormValue } from './query-params-to-form-value';
import { formValueToSearchParams } from './form-value-to-search-params';
import { SearchFormValue } from './search-form-value';

@Component({
    selector: 'cc-claim-search-form',
    templateUrl: 'claim-search-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClaimSearchFormComponent implements OnInit {
    @Input() hidePartyId = false;
    @Output() valueChanges: EventEmitter<SearchFormValue> = new EventEmitter();

    form: FormGroup = this.fb.group({
        statuses: '',
        claim_id: '',
        party_id: ''
    });

    claimStatuses = ['pending', 'review', 'accepted', 'denied', 'revoked', 'pending_acceptance'];

    constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {}

    ngOnInit() {
        this.form.valueChanges.pipe(debounceTime(300), map(removeEmptyProperties)).subscribe(v => {
            this.router.navigate([location.pathname], { queryParams: v });
            this.valueChanges.emit(formValueToSearchParams(v));
        });
        this.route.queryParams
            .pipe(take(1), map(queryParamsToFormValue))
            .subscribe(v => this.form.patchValue(v));
    }
}
