import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import moment from 'moment';

import { removeEmptyProperties } from '@cc/operators/index';

import { ChargebacksParams } from '../../../../query-dsl';
import { ChargebacksMainSearchFiltersService } from './chargebacks-main-search-filters.service';

@Component({
    selector: 'cc-chargebacks-main-search-filters',
    templateUrl: 'chargebacks-main-search-filters.component.html',
    styleUrls: ['chargebacks-main-search-filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ChargebacksMainSearchFiltersService],
})
export class ChargebacksMainSearchFiltersComponent implements OnInit {
    @Input() partyID: string;
    @Input() initParams: ChargebacksParams;
    @Output() valueChanges = new EventEmitter<ChargebacksParams>();

    shops$ = this.chargebacksMainSearchFiltersService.shops$;

    form = this.chargebacksMainSearchFiltersService.form;

    constructor(private chargebacksMainSearchFiltersService: ChargebacksMainSearchFiltersService) {
        this.chargebacksMainSearchFiltersService.searchParamsChanges$
            .pipe(removeEmptyProperties)
            .subscribe((params) => this.valueChanges.emit(params));
    }

    ngOnInit() {
        const { from_time, to_time, ...params } = this.initParams || {};
        this.chargebacksMainSearchFiltersService.init(
            Object.assign(
                params,
                !!from_time && { from_time: moment(from_time) },
                !!to_time && { to_time: moment(to_time) }
            )
        );
        this.chargebacksMainSearchFiltersService.getShops(this.partyID);
    }
}
