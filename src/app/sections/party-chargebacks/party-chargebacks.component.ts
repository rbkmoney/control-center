import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, ReplaySubject } from 'rxjs';
import { map, pluck, shareReplay } from 'rxjs/operators';

import { FormValue } from '@cc/app/shared/components/chargebacks-search-filters';

import { ChargebacksSearchFiltersStore } from './chargebacks-search-filters-store.service';

@Component({
    templateUrl: 'party-chargebacks.component.html',
    providers: [ChargebacksSearchFiltersStore],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyChargebacksComponent {
    partyID$ = this.route.params.pipe(pluck('partyID'), shareReplay(1));
    initSearchParams$ = this.chargebacksSearchFiltersStore.data$;
    searchParamsChanges$ = new ReplaySubject<FormValue>();
    otherSearchParamsChanges$ = new ReplaySubject<FormValue>();
    searchParams$ = combineLatest([this.searchParamsChanges$, this.otherSearchParamsChanges$]).pipe(
        map(([a, b]) => ({ ...a, ...b })),
        shareReplay(1)
    );

    constructor(
        private route: ActivatedRoute,
        private chargebacksSearchFiltersStore: ChargebacksSearchFiltersStore
    ) {
        this.searchParams$.subscribe((params) =>
            this.chargebacksSearchFiltersStore.preserve(params)
        );
    }
}
