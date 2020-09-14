import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import {
    BankCardPaymentSystem,
    BankCardTokenProvider,
} from '../../../../thrift-services/damsel/gen-model/domain';
import { BankCard } from '../../../../thrift-services/damsel/gen-model/merch_stat';

@Component({
    selector: 'cc-bank-card',
    templateUrl: 'bank-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankCardComponent {
    @Input() bankCard: BankCard;

    paymentSystems = BankCardPaymentSystem;
    tokenProviders = BankCardTokenProvider;
}
