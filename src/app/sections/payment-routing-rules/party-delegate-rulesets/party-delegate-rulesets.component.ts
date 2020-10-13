import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { PartyDelegateRulesetsService } from './party-delegate-rulesets.service';

@Component({
    selector: 'cc-party-delegate-rulesets',
    templateUrl: 'party-delegate-rulesets.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PartyDelegateRulesetsService],
})
export class PartyDelegateRulesetsComponent {
    displayedColumns = ['paymentInstitution', 'mainRuleset', 'partyDelegate', 'actions'];
    dataSource$ = this.partyDelegateRulesetsService.partyDelegateRulesets$;

    constructor(
        private partyDelegateRulesetsService: PartyDelegateRulesetsService,
        private router: Router
    ) {}

    attachNewRuleset() {}

    navigateToPartyRuleset(id: string) {
        this.partyDelegateRulesetsService.partyID$
            .pipe(first())
            .subscribe((partyID) =>
                this.router.navigate([
                    'party',
                    partyID,
                    'payment-routing-rules',
                    'party-ruleset',
                    id,
                ])
            );
    }
}
