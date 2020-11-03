import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FetchPartiesService } from '@cc/app/shared/services/fetch-parties.service';

import { PartiesSearchFiltersParams } from './parties-search-filters';
import { PartyActions } from './parties-table/party-actions';
import { PartyMenuItemEvent } from './parties-table/party-menu-item-event';
import { SearchPartiesService } from './search-parties.service';

@Component({
    templateUrl: 'search-parties.component.html',
    styleUrls: ['search-parties.component.scss'],
    providers: [SearchPartiesService, FetchPartiesService],
})
export class SearchPartiesComponent {
    initSearchParams$ = this.partiesService.data$;
    inProgress$ = this.fetchPartiesService.inProgress$;
    parties$ = this.fetchPartiesService.parties$;

    constructor(
        private partiesService: SearchPartiesService,
        private fetchPartiesService: FetchPartiesService,
        private router: Router
    ) {}

    searchParamsUpdated($event: PartiesSearchFiltersParams) {
        this.partiesService.preserve($event);
        this.fetchPartiesService.searchParties($event);
    }

    partyMenuItemSelected(event: PartyMenuItemEvent) {
        switch (event.action) {
            case PartyActions.navigateToParty:
                this.router.navigate([`/party/${event.partyID}`]);
        }
    }
}
