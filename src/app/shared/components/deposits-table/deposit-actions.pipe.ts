import { Pipe, PipeTransform } from '@angular/core';

import { DepositActions } from './deposit-actions';

const depositActionNames: { [N in DepositActions]: string } = {
    [DepositActions.navigateToDeposit]: 'Deposit Details',
};

@Pipe({
    name: 'ccDepositActions',
})
export class DepositActionsPipe implements PipeTransform {
    transform(action: string): string {
        return depositActionNames[action] || action;
    }
}
