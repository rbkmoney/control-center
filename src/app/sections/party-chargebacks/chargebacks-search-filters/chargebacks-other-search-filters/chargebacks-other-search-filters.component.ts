import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { ChargebacksParams } from 'src/app/query-dsl';

import { ChargebacksOtherSearchFiltersService } from './chargebacks-other-search-filters.service';

@Component({
    selector: 'cc-chargebacks-other-search-filters',
    templateUrl: 'chargebacks-other-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ChargebacksOtherSearchFiltersService],
})
export class ChargebacksOtherSearchFiltersComponent implements OnInit {
    @Input() initParams: ChargebacksParams;
    @Output() valueChanges = new EventEmitter<ChargebacksParams>();

    count$ = this.chargebacksOtherSearchFiltersService.filtersCount$;

    constructor(
        private chargebacksOtherSearchFiltersService: ChargebacksOtherSearchFiltersService
    ) {
        this.chargebacksOtherSearchFiltersService.formParams$.subscribe((params) => {
            this.valueChanges.emit(params);
        });
    }

    ngOnInit() {
        this.chargebacksOtherSearchFiltersService.init(this.initParams);
    }

    openOtherFiltersDialog() {
        this.chargebacksOtherSearchFiltersService.openOtherFiltersDialog();
    }
}
