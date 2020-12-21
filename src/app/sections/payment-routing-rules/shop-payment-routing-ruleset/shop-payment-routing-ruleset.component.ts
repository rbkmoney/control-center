import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest } from 'rxjs';
import { map, shareReplay, switchMap, take } from 'rxjs/operators';
import { Predicate, TerminalObject } from 'src/app/thrift-services/damsel/gen-model/domain';

import { handleError } from '../../../../utils/operators/handle-error';
import { ErrorService } from '../../../shared/services/error';
import { damselInstanceToObject, objectToJSON } from '../../../thrift-services';
import { DomainCacheService } from '../../../thrift-services/damsel/domain-cache.service';
import { AddShopPaymentRoutingRuleDialogComponent } from './add-shop-payment-routing-rule-dialog';
import { ShopPaymentRoutingRulesetService } from './shop-payment-routing-ruleset.service';

const DIALOG_WIDTH = '548px';

@UntilDestroy()
@Component({
    selector: 'cc-shop-payment-routing-ruleset',
    templateUrl: 'shop-payment-routing-ruleset.component.html',
    providers: [ShopPaymentRoutingRulesetService],
})
export class ShopPaymentRoutingRulesetComponent {
    shopRuleset$ = this.shopPaymentRoutingRulesetService.shopRuleset$;
    partyID$ = this.shopPaymentRoutingRulesetService.partyID$;
    partyRulesetRefID$ = this.shopPaymentRoutingRulesetService.partyRulesetRefID$;
    shop$ = this.shopPaymentRoutingRulesetService.shop$;
    candidates$ = this.shopPaymentRoutingRulesetService.shopRuleset$.pipe(
        map((r) => r.data.decisions.candidates),
        shareReplay(1)
    );
    terminalsMapID$ = this.domainService
        .getObjects('terminal')
        .pipe(
            map((terminals) =>
                terminals.reduce(
                    (acc, t) => ((acc[t.ref.id] = t), acc),
                    {} as { [N in number]: TerminalObject }
                )
            )
        );
    isLoading$ = this.domainService.isLoading$;

    constructor(
        private dialog: MatDialog,
        private shopPaymentRoutingRulesetService: ShopPaymentRoutingRulesetService,
        private domainService: DomainCacheService,
        private errorService: ErrorService
    ) {}

    addShopRule() {
        combineLatest([this.partyID$, this.shopPaymentRoutingRulesetService.refID$])
            .pipe(
                take(1),
                switchMap(([partyID, refID]) =>
                    this.dialog
                        .open(AddShopPaymentRoutingRuleDialogComponent, {
                            disableClose: true,
                            width: DIALOG_WIDTH,
                            maxHeight: '90vh',
                            data: { partyID, refID },
                        })
                        .afterClosed()
                ),
                handleError(this.errorService.error),
                untilDestroyed(this)
            )
            .subscribe();
    }

    removeShopRule(idx: number) {
        this.shopPaymentRoutingRulesetService.removeShopRule(idx);
    }

    terminalToObject(terminal: TerminalObject) {
        return objectToJSON(
            damselInstanceToObject<TerminalObject>('domain', 'TerminalObject', terminal)
        );
    }

    predicateToObject(predicate: Predicate) {
        return objectToJSON(damselInstanceToObject<Predicate>('domain', 'Predicate', predicate));
    }
}
