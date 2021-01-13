import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest } from 'rxjs';
import { filter, first, map, switchMap, take } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '@cc/components/confirm-action-dialog';

import { handleError } from '../../../../utils/operators/handle-error';
import { ErrorService } from '../../../shared/services/error';
import { RoutingRulesService } from '../../../thrift-services';
import { DomainCacheService } from '../../../thrift-services/damsel/domain-cache.service';
import { ChangeTargetDialogComponent } from '../change-target-dialog';
import { AttachNewRulesetDialogComponent } from './attach-new-ruleset-dialog';
import { PartyDelegateRulesetsService } from './party-delegate-rulesets.service';

@UntilDestroy()
@Component({
    selector: 'cc-party-delegate-rulesets',
    templateUrl: 'party-delegate-rulesets.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PartyDelegateRulesetsService],
})
export class PartyDelegateRulesetsComponent {
    displayedColumns = [
        { key: 'paymentInstitution', name: 'Payment institution' },
        { key: 'mainRuleset', name: 'Main ruleset' },
        { key: 'partyDelegate', name: 'Party delegate' },
    ];
    isLoading$ = this.domainService.isLoading$;
    data$ = this.partyDelegateRulesetsService.getDelegatesWithPaymentInstitution().pipe(
        map((rules) =>
            rules.map((r) => ({
                parentRefId: r?.parentRoutingRule?.ref?.id,
                delegateIdx: r?.parentRoutingRule?.data?.decisions?.delegates?.findIndex(
                    (d) => d === r?.partyDelegate
                ),
                paymentInstitution: {
                    text: r?.paymentInstitution?.data?.name,
                    caption: r?.paymentInstitution?.ref?.id,
                },
                mainRuleset: {
                    text: r?.parentRoutingRule?.data?.name,
                    caption: r?.parentRoutingRule?.ref?.id,
                },
                partyDelegate: {
                    text: r?.partyDelegate?.description,
                    caption: r?.partyDelegate?.ruleset?.id,
                },
            }))
        )
    );

    constructor(
        private partyDelegateRulesetsService: PartyDelegateRulesetsService,
        private paymentRoutingRulesService: RoutingRulesService,
        private router: Router,
        private dialog: MatDialog,
        private domainService: DomainCacheService,
        private errorService: ErrorService
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
                handleError(this.errorService.error),
                untilDestroyed(this)
            )
            .subscribe();
    }

    navigateToPartyRuleset(parentRefId: number, delegateIdx: number) {
        combineLatest([
            this.partyDelegateRulesetsService.partyID$,
            this.paymentRoutingRulesService.getRuleset(parentRefId),
        ])
            .pipe(first(), untilDestroyed(this))
            .subscribe(([partyID, parent]) =>
                this.router.navigate([
                    'party',
                    partyID,
                    'payment-routing-rules',
                    parent.data.decisions.delegates[delegateIdx].ruleset.id,
                ])
            );
    }

    changeTarget(mainRulesetRefID: number, delegateIdx: number) {
        this.dialog
            .open(ChangeTargetDialogComponent, {
                ...ChangeTargetDialogComponent.defaultConfig,
                data: { mainRulesetRefID, delegateIdx },
            })
            .afterClosed()
            .pipe(handleError(this.errorService.error), untilDestroyed(this))
            .subscribe();
    }

    deleteRuleset(parentRefId: number, delegateIdx: number) {
        this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter((r) => r === 'confirm'),
                switchMap(() =>
                    this.paymentRoutingRulesService.deleteDelegate({
                        delegateIdx,
                        parentRefId,
                    })
                ),
                handleError(this.errorService.error),
                untilDestroyed(this)
            )
            .subscribe();
    }
}
