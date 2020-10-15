import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, shareReplay } from 'rxjs/operators';

import { SearchFiltersParams } from '@cc/app/shared/components/payments-search-filters/search-filters-params';
import {
    SearcherType,
    SearchType,
} from '@cc/app/shared/components/payments-searcher/searcher-type';

import { PartyPaymentsService } from './party-payments.service';

@Component({
    templateUrl: 'party-payments.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PartyPaymentsService, PartyPaymentsService],
})
export class PartyPaymentsComponent {
    searchType: SearcherType;
    initsearchParams$ = this.partyPaymentsService.data$;

    constructor(private route: ActivatedRoute, private partyPaymentsService: PartyPaymentsService) {
        this.route.params.pipe(pluck('partyID'), shareReplay(1)).subscribe((partyID) => {
            this.searchType = {
                type: SearchType.PartySearcher,
                partyID,
            };
        });
    }

    searchParamsUpdated($event: SearchFiltersParams) {
        this.partyPaymentsService.preserve($event);
    }
}
