import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PartiesSearchFiltersParams } from '@cc/app/shared/components';
import { PartyActions } from '@cc/app/shared/components/parties-table/party-actions';
import { PartyMenuItemEvent } from '@cc/app/shared/components/parties-table/party-menu-item-event';

import { FetchPartiesService } from './fetch-parties.service';
import { MerchantsService } from './merchants.service';

@Component({
    templateUrl: 'merchants.component.html',
    styleUrls: ['merchants.component.scss'],
    providers: [MerchantsService, FetchPartiesService],
})
export class MerchantsComponent {
    initSearchParams$ = this.merchantsService.data$;
    isLoading$ = this.fetchPartiesService.isLoading$;
    parties$ = this.fetchPartiesService.parties$;

    constructor(
        private merchantsService: MerchantsService,
        private fetchPartiesService: FetchPartiesService,
        private router: Router
    ) {}

    searchParamsUpdated($event: PartiesSearchFiltersParams) {
        this.merchantsService.preserve($event);
        this.fetchPartiesService.search($event);
    }

    partyMenuItemSelected(event: PartyMenuItemEvent) {
        switch (event.action) {
            case PartyActions.navigateToParty:
                this.router.navigate([`/party/${event.partyID}`]);
        }
    }
}
