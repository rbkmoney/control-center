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
import {
    PaymentActions,
    PaymentMenuItemEvent,
    PaymentsTableType,
    TableType,
} from '../payments-table';
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

    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Input()
    initSearchParams: SearchFiltersParams;

    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Output()
    searchParamsChanged$: EventEmitter<SearchFiltersParams> = new EventEmitter();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Output()
    paymentEventFired$: EventEmitter<PaymentMenuItemEvent> = new EventEmitter();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    isLoading$ = this.fetchPaymentsService.isLoading$;
    // eslint-disable-next-line @typescript-eslint/member-ordering
    doAction$ = this.fetchPaymentsService.doAction$;
    // eslint-disable-next-line @typescript-eslint/member-ordering
    payments$ = this.fetchPaymentsService.searchResult$;
    // eslint-disable-next-line @typescript-eslint/member-ordering
    hasMore$ = this.fetchPaymentsService.hasMore$;
    // eslint-disable-next-line @typescript-eslint/member-ordering
    tableType: PaymentsTableType;
    // eslint-disable-next-line @typescript-eslint/member-ordering
    mainFilterSearchType: MainFilterSearchType;

    constructor(
        private fetchPaymentsService: FetchPaymentsService,
        private paymentsSearcherService: PaymentsSearcherService,
        private snackBar: MatSnackBar
    ) {
        this.paymentsSearcherService.searchParamsChanges$.subscribe((params) => {
            const searchParams = {
                ...params,
                partyID:
                    this.mainFilterSearchType.type === MainSearchType.PartySearchFilter
                        ? this.searcherType.partyID
                        : params.partyID,
            };
            this.fetchPaymentsService.search(searchParams);
            this.searchParamsChanged$.emit(searchParams);
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
        this.paymentsSearcherService.searchParamsChanges(params);
    }

    paymentMenuItemSelected(paymentMenuItemEvent: PaymentMenuItemEvent) {
        switch (paymentMenuItemEvent.action) {
            case PaymentActions.NavigateToPayment:
                this.paymentEventFired$.emit(paymentMenuItemEvent);
                break;
        }
    }
}
