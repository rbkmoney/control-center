import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, ReplaySubject } from 'rxjs';
import { filter, map, shareReplay, switchMap, take, withLatestFrom } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '@cc/components/confirm-action-dialog';

import { handleError } from '../../../../utils/operators/handle-error';
import { ErrorService } from '../../../shared/services/error';
import { PaymentRoutingRulesService } from '../../../thrift-services';
import { DomainCacheService } from '../../../thrift-services/damsel/domain-cache.service';
import { ChangeTargetDialogComponent } from '../change-target-dialog';
import { AddPartyPaymentRoutingRuleDialogComponent } from './add-party-payment-routing-rule-dialog';
import { InitializePaymentRoutingRulesDialogComponent } from './initialize-payment-routing-rules-dialog';
import { PartyPaymentRoutingRulesetService } from './party-payment-routing-ruleset.service';

const DIALOG_WIDTH = '548px';

@UntilDestroy()
@Component({
    selector: 'cc-party-payment-routing-ruleset',
    templateUrl: 'party-payment-routing-ruleset.component.html',
    styleUrls: ['party-payment-routing-ruleset.component.scss'],
    providers: [PartyPaymentRoutingRulesetService],
})
export class PaymentRoutingRulesComponent {
    partyRuleset$ = this.partyPaymentRoutingRulesetService.partyRuleset$;
    partyID$ = this.partyPaymentRoutingRulesetService.partyID$;
    displayedColumns = ['shop', 'id', 'actions'];
    isLoading$ = this.domainService.isLoading$;

    @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
        this.paginator$.next(paginator);
    }
    paginator$ = new ReplaySubject<MatPaginator>(1);
    dataSource$ = combineLatest([
        this.partyRuleset$,
        this.partyPaymentRoutingRulesetService.shops$,
        this.paginator$,
    ]).pipe(
        filter(([r]) => !!r),
        map(([ruleset, shops, paginator]) => {
            const data = new MatTableDataSource(
                ruleset.data.decisions.delegates
                    .filter((d) => d?.allowed?.condition?.party?.definition?.shop_is)
                    .map((d) => {
                        const shopId = d.allowed.condition.party.definition.shop_is;
                        return {
                            id: d.ruleset.id,
                            shop: shops.find((s) => s.id === shopId) || { id: shopId },
                        };
                    })
            );
            data.paginator = paginator;
            return data;
        }),
        shareReplay(1)
    );

    constructor(
        private dialog: MatDialog,
        private partyPaymentRoutingRulesetService: PartyPaymentRoutingRulesetService,
        private paymentRoutingRulesService: PaymentRoutingRulesService,
        private router: Router,
        private domainService: DomainCacheService,
        private errorService: ErrorService
    ) {}

    initialize() {
        combineLatest([
            this.partyPaymentRoutingRulesetService.partyID$,
            this.partyPaymentRoutingRulesetService.refID$,
        ])
            .pipe(
                take(1),
                switchMap(([partyID, refID]) =>
                    this.dialog
                        .open(InitializePaymentRoutingRulesDialogComponent, {
                            disableClose: true,
                            width: DIALOG_WIDTH,
                            maxHeight: '90vh',
                            data: { partyID, refID },
                        })
                        .afterClosed()
                ),
                untilDestroyed(this)
            )
            .subscribe();
    }

    addPartyRule() {
        combineLatest([
            this.partyPaymentRoutingRulesetService.refID$,
            this.partyPaymentRoutingRulesetService.shops$,
            this.partyPaymentRoutingRulesetService.partyID$,
        ])
            .pipe(
                take(1),
                switchMap(([refID, shops, partyID]) =>
                    this.dialog
                        .open(AddPartyPaymentRoutingRuleDialogComponent, {
                            disableClose: true,
                            width: DIALOG_WIDTH,
                            maxHeight: '90vh',
                            data: { refID, shops, partyID },
                        })
                        .afterClosed()
                ),
                untilDestroyed(this)
            )
            .subscribe();
    }

    deleteRuleset(rulesetRefID: number) {
        this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter((r) => r === 'confirm'),
                withLatestFrom(this.partyRuleset$),
                switchMap(([, mainRuleset]) =>
                    this.paymentRoutingRulesService.deleteDelegate({
                        mainRulesetRefID: mainRuleset.ref.id,
                        rulesetRefID,
                    })
                ),
                handleError(this.errorService.error),
                untilDestroyed(this)
            )
            .subscribe();
    }

    navigateToShopRuleset(refID: string) {
        combineLatest([
            this.partyPaymentRoutingRulesetService.partyID$,
            this.partyPaymentRoutingRulesetService.refID$,
        ])
            .pipe(take(1), untilDestroyed(this))
            .subscribe(([partyID, partyRefID]) =>
                this.router.navigate([
                    'party',
                    partyID,
                    'payment-routing-rules',
                    partyRefID,
                    'shop-ruleset',
                    refID,
                ])
            );
    }

    changeTarget(rulesetID: string) {
        this.partyRuleset$
            .pipe(
                take(1),
                switchMap((mainRuleset) =>
                    this.dialog
                        .open(ChangeTargetDialogComponent, {
                            ...ChangeTargetDialogComponent.defaultConfig,
                            data: { mainRulesetRefID: mainRuleset.ref.id, rulesetID },
                        })
                        .afterClosed()
                ),
                handleError(this.errorService.error),
                untilDestroyed(this)
            )
            .subscribe();
    }
}
