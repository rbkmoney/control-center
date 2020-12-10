import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, first, switchMap, take } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '@cc/components/confirm-action-dialog';

import { PaymentRoutingRulesService } from '../../../thrift-services';
import { DomainCacheService } from '../../../thrift-services/damsel/domain-cache.service';
import { AttachNewRulesetDialogComponent } from './attach-new-ruleset-dialog';
import { ChangeTargetDialogComponent } from './change-target-dialog';
import { PartyDelegateRulesetsService } from './party-delegate-rulesets.service';

@UntilDestroy()
@Component({
    selector: 'cc-party-delegate-rulesets',
    templateUrl: 'party-delegate-rulesets.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PartyDelegateRulesetsService],
})
export class PartyDelegateRulesetsComponent {
    displayedColumns = ['paymentInstitution', 'mainRuleset', 'partyDelegate', 'actions'];
    dataSource$ = this.partyDelegateRulesetsService.partyDelegateRulesets$;
    isLoading$ = this.domainService.isLoading$;

    constructor(
        private partyDelegateRulesetsService: PartyDelegateRulesetsService,
        private paymentRoutingRulesService: PaymentRoutingRulesService,
        private router: Router,
        private dialog: MatDialog,
        private domainService: DomainCacheService
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
                ),
                untilDestroyed(this)
            )
            .subscribe();
    }

    navigateToPartyRuleset(id: string) {
        this.partyDelegateRulesetsService.partyID$
            .pipe(first(), untilDestroyed(this))
            .subscribe((partyID) =>
                this.router.navigate(['party', partyID, 'payment-routing-rules', id])
            );
    }

    changeTarget(mainRulesetRefID: string, rulesetID: string) {
        this.dialog
            .open(ChangeTargetDialogComponent, {
                ...ChangeTargetDialogComponent.defaultConfig,
                data: { mainRulesetRefID, rulesetID },
            })
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe();
    }

    deleteRuleset(mainRulesetRefID: number, rulesetRefID: number) {
        this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter((r) => r === 'confirm'),
                switchMap(() =>
                    this.paymentRoutingRulesService.deleteRulesetAndDelegate({
                        mainRulesetRefID,
                        rulesetRefID,
                    })
                ),
                untilDestroyed(this)
            )
            .subscribe();
    }
}
