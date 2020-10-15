import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
    MainFilterSearchType,
    MainSearchType,
    SearchFiltersParams,
} from '../payments-search-filters';
import { PaymentsTableType, TableType } from '../payments-table';
import { FetchPaymentsService } from './fetch-payments.service';
import { PaymentsSearcherService } from './payments-searcher.service';
import { SearcherType, SearchType } from './searcher-type';

@Component({
    selector: 'cc-payments-searcher',
    templateUrl: 'payments-searcher.component.html',
    styleUrls: ['payments-searcher.component.scss'],
    providers: [FetchPaymentsService, PaymentsSearcherService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsSearcherComponent implements OnInit {
    private searcherType: SearcherType;

    @Input()
    set type(type: SearcherType) {
        this.searcherType = type;
        switch (type.type) {
            case SearchType.GlobalSearcher:
                this.tableType = { type: TableType.GlobalTable };
                this.mainFilterSearchType = { type: MainSearchType.GlobalSearchFilter };
                break;
            case SearchType.PartySearcher:
                this.tableType = { type: TableType.PartyTable, partyID: type.partyID };
                this.mainFilterSearchType = {
                    type: MainSearchType.PartySearchFilter,
                    partyID: type.partyID,
                };
                break;
            default:
                console.error('Wrong search type for payments searcher');
                break;
        }
    }

    @Input()
    initSearchParams: SearchFiltersParams;

    @Output()
    searchParams$: EventEmitter<SearchFiltersParams> = new EventEmitter();

    isLoading$ = this.fetchPaymentsService.isLoading$;
    doAction$ = this.fetchPaymentsService.doAction$;
    payments$ = this.fetchPaymentsService.searchResult$;
    hasMore$ = this.fetchPaymentsService.hasMore$;
    tableType: PaymentsTableType;
    mainFilterSearchType: MainFilterSearchType;

    constructor(
        private fetchPaymentsService: FetchPaymentsService,
        private partyPaymentsService: PaymentsSearcherService,
        private snackBar: MatSnackBar
    ) {
        this.partyPaymentsService.searchParamsChanges$.subscribe((params) => {
            this.fetchPaymentsService.search({
                ...params,
                partyID: params.partyID ? params.partyID : this.searcherType.partyID,
            });
            this.searchParams$.emit({
                ...params,
                partyID: params.partyID ? params.partyID : this.searcherType.partyID,
            });
        });
    }

    ngOnInit() {
        this.fetchPaymentsService.errors$.subscribe((e) =>
            this.snackBar.open(`An error occurred while search payments (${e})`, 'OK')
        );
    }

    fetchMore() {
        this.fetchPaymentsService.fetchMore();
    }

    searchParamsChanges(params: SearchFiltersParams) {
        this.partyPaymentsService.searchParamsChanges({
            ...params,
            partyID: params.partyID ? params.partyID : this.searcherType.partyID,
        });
    }
}
