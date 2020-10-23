import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PartiesSearchFiltersParams } from './parties-search-filters-params';
import { PartiesSearchFiltersService } from './parties-search-filters.service';

@Component({
    selector: 'cc-parties-search-filters',
    templateUrl: 'parties-search-filters.component.html',
    providers: [PartiesSearchFiltersService],
})
export class PartiesSearchFiltersComponent implements OnInit {
    @Input()
    initParams: PartiesSearchFiltersParams;

    @Output()
    searchParamsChanged$: EventEmitter<any> = new EventEmitter();

    form = this.partiesSearchFiltersService.form;

    constructor(private partiesSearchFiltersService: PartiesSearchFiltersService) {
        this.partiesSearchFiltersService.searchParamsChanged$.subscribe((params) =>
            this.searchParamsChanged$.emit(params)
        );
    }

    ngOnInit() {
        this.partiesSearchFiltersService.init(this.initParams);
    }
}
