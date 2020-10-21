import { Component } from '@angular/core';

import { PartiesSearchFiltersParams } from '@cc/app/shared/components';

import { FetchPartiesService } from './fetch-parties.service';
import { PartiesService } from './parties.service';

@Component({
    templateUrl: 'parties.component.html',
    styleUrls: ['parties.component.scss'],
    providers: [PartiesService, FetchPartiesService],
})
export class PartiesComponent {
    initsearchParams$ = this.partiesService.data$;
    isLoading$ = this.fetchPartiesService.isLoading$;
    parties$ = this.fetchPartiesService.parties$;

    constructor(
        private partiesService: PartiesService,
        private fetchPartiesService: FetchPartiesService
    ) {
        this.parties$.subscribe((q) => console.log(q));
    }

    searchParamsUpdated($event: PartiesSearchFiltersParams) {
        this.partiesService.preserve($event);
        this.fetchPartiesService.search($event);
    }
}
