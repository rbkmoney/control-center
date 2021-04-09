import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import {
    LegacyBankCardPaymentSystem,
    LegacyBankCardTokenProvider,
} from '../../../../../thrift-services/damsel/gen-model/domain';
import { BankCard } from '../../../../../thrift-services/damsel/gen-model/merch_stat';

@Component({
    selector: 'cc-bank-card',
    templateUrl: 'bank-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankCardComponent {
    @Input() bankCard: BankCard;

    // TODO Need migration according to: https://github.com/rbkmoney/damsel/commit/61677b86006d405619bdc5f23d6416a929688180
    legacyPaymentSystems = LegacyBankCardPaymentSystem;
    legacyTokenProviders = LegacyBankCardTokenProvider;
}
