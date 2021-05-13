import { Pipe, PipeTransform } from '@angular/core';

import { DepositActions } from './deposit-actions';

const DEPOSIT_ACTION_NAMES: { [N in DepositActions]: string } = {
    [DepositActions.NavigateToDeposit]: 'Deposit Details',
};

@Pipe({
    name: 'ccDepositActions',
})
export class DepositActionsPipe implements PipeTransform {
    transform(action: string): string {
        return DEPOSIT_ACTION_NAMES[action] || action;
    }
}
