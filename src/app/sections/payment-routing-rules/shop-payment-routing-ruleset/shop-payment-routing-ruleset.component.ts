import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest } from 'rxjs';
import { map, shareReplay, switchMap, take } from 'rxjs/operators';
import { Predicate, TerminalObject } from 'src/app/thrift-services/damsel/gen-model/domain';

import { damselInstanceToObject, DomainTypedManager } from '../../../thrift-services';
import { AddShopPaymentRoutingRuleDialogComponent } from './add-shop-payment-routing-rule-dilaog';
import { ShopPaymentRoutingRulesetService } from './shop-payment-routing-ruleset.service';

const DIALOG_WIDTH = '548px';

@Component({
    selector: 'cc-shop-payment-routing-ruleset',
    templateUrl: 'shop-payment-routing-ruleset.component.html',
    providers: [ShopPaymentRoutingRulesetService],
})
export class ShopPaymentRoutingRulesetComponent {
    shopDelegate$ = this.shopPaymentRoutingRulesetService.shopDelegate$;
    partyID$ = this.shopPaymentRoutingRulesetService.partyID$;
    shop$ = this.shopPaymentRoutingRulesetService.shop$;
    candidates$ = this.shopPaymentRoutingRulesetService.shopRuleset$.pipe(
        map((r) => r.data.decisions.candidates),
        shareReplay(1)
    );
    terminalsMapID$ = this.domainTypedManager
        .getTerminalObjects()
        .pipe(
            map((terminals) =>
                terminals.reduce(
                    (acc, t) => ((acc[t.ref.id] = t), acc),
                    {} as { [N in number]: TerminalObject }
                )
            )
        );

    constructor(
        private dialog: MatDialog,
        private shopPaymentRoutingRulesetService: ShopPaymentRoutingRulesetService,
        private domainTypedManager: DomainTypedManager
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
                            data: { partyID, refID },
                        })
                        .afterClosed()
                )
            )
            .subscribe();
    }

    removeShopRule(idx: number) {
        this.shopPaymentRoutingRulesetService.removeShopRule(idx);
    }

    terminalToObject(terminal: TerminalObject) {
        return damselInstanceToObject<TerminalObject>('domain', 'TerminalObject', terminal);
    }

    predicateToObject(predicate: Predicate) {
        return damselInstanceToObject<Predicate>('domain', 'Predicate', predicate);
    }
}
