import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SearchFormService } from './search-form.service';
import { formValueToSearchParams } from './to-search-params';
import { PayoutSearchParams } from '../../papi/params';

@Component({
    selector: 'cc-payouts-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit {
    @Output()
    valueChanges: EventEmitter<PayoutSearchParams> = new EventEmitter();

    @Output()
    statusChanges: EventEmitter<string> = new EventEmitter();

    form: FormGroup;

    payoutStatuses: string[];

    constructor(private searchFormService: SearchFormService) {}

    ngOnInit() {
        const { payoutStatuses, form } = this.searchFormService;
        this.form = form;
        this.payoutStatuses = payoutStatuses;
        this.form.valueChanges.subscribe(value => this.emitValue(value));
        this.form.statusChanges.subscribe(status => this.emitStatus(status));
        this.emitValue(this.form.value);
        this.emitStatus(this.form.status);
    }

    private emitValue(formValue: any) {
        this.valueChanges.emit(formValueToSearchParams(formValue));
    }

    private emitStatus(status: string) {
        this.statusChanges.emit(status);
    }
}
