import { Component } from '@angular/core';
import { PartySearchService } from './party-search.service';

@Component({
    templateUrl: 'party-search.component.html',
    providers: [PartySearchService]
})
export class PartySearchComponent {
    form = this.partySearchService.form;
    isLoading = this.partySearchService.isLoading;

    constructor(private partySearchService: PartySearchService) {}

    goToParty() {
        this.partySearchService.goToParty();
    }
}
