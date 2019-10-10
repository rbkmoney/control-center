import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SearchFormService } from './search-form.service';
import { SearchFormParams } from './search-form-params';

@Component({
    selector: 'cc-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit {
    @Output()
    valueChanges: EventEmitter<SearchFormParams> = new EventEmitter();

    @Output()
    statusChanges: EventEmitter<string> = new EventEmitter();

    form: FormGroup;

    depositStatuses = [
        'Pending',
        'Succeeded',
        'Failed'
    ];

    constructor(private searchFormService: SearchFormService) {}

    ngOnInit() {
        this.form = this.searchFormService.form;
        this.form.valueChanges.subscribe((value) => {
                console.log(value);
                this.valueChanges.emit(this.formValueToSearchParams(value))
            }
        );
        this.form.statusChanges.subscribe((status) => this.statusChanges.emit(status));
        this.form.updateValueAndValidity();
    }

    private formValueToSearchParams(value: any): SearchFormParams {
        const { fromTime, toTime, amountTo } = value;
        return {
            ...value,
            fromTime: fromTime ? fromTime.startOf('day').toISOString() : '',
            toTime: toTime ? toTime.endOf('day').toISOString() : '',
            amountTo: amountTo ? Math.round(amountTo * 100) : amountTo
        };
    }

}
