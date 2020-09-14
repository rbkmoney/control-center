import { Pipe, PipeTransform } from '@angular/core';

import {
    PaymentTerminal,
    TerminalPaymentProvider,
} from '../../../thrift-services/damsel/gen-model/merch_stat';

@Pipe({
    name: 'toPaymentTerminal',
})
export class ToPaymentTerminalPipe implements PipeTransform {
    transform(terminal: PaymentTerminal): string {
        return toPaymentTerminal(terminal);
    }
}

export const toPaymentTerminal = (terminal: PaymentTerminal): string => {
    switch (terminal.terminal_type) {
        case TerminalPaymentProvider.euroset:
            return 'Евросеть';
        case TerminalPaymentProvider.wechat:
            return 'WeChat';
        case TerminalPaymentProvider.alipay:
            return 'AliPay';
        case TerminalPaymentProvider.zotapay:
            return 'ZotaPay';
        case TerminalPaymentProvider.qps:
            return 'QPS';
    }
};
