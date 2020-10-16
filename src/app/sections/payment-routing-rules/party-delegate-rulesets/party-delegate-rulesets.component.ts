import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first, switchMap, take } from 'rxjs/operators';

import { AttachNewRulesetDialogComponent } from './attach-new-ruleset-dialog';
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
        private router: Router,
        private dialog: MatDialog
    ) {}

    attachNewRuleset() {
        this.partyDelegateRulesetsService.partyID$
            .pipe(
                take(1),
                switchMap((partyID) =>
                    this.dialog
                        .open(AttachNewRulesetDialogComponent, {
                            ...AttachNewRulesetDialogComponent.defaultConfig,
                            data: { partyID },
                        })
                        .afterClosed()
                )
            )
            .subscribe();
    }

    navigateToPartyRuleset(id: string) {
        this.partyDelegateRulesetsService.partyID$
            .pipe(first())
            .subscribe((partyID) =>
                this.router.navigate(['party', partyID, 'payment-routing-rules', id])
            );
    }
}
