import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PartiesSearchFiltersParams } from '@cc/app/shared/components';
import { PartyActions } from '@cc/app/shared/parties-table/party-actions';
import { PartyMenuItemEvent } from '@cc/app/shared/parties-table/party-menu-item-event';

import { FetchPartiesService } from './fetch-parties.service';
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
        this.fetchPartiesService.search($event);
    }

    partyMenuItemSelected(event: PartyMenuItemEvent) {
        switch (event.action) {
            case PartyActions.navigateToParty:
                this.router.navigate([`/party/${event.partyID}`]);
        }
    }
}
