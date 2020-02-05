import { Pipe, PipeTransform } from '@angular/core';
import { toOptional } from '../../../../shared/utils';

@Pipe({
    name: 'bankInfo'
})
export class BankInfoPipe implements PipeTransform {
    transform(bankInfo: {
        bank_name?: string;
        bank_bik?: string;
        bank_post_account?: string;
    }): string {
        const { bank_name, bank_bik, bank_post_account } = toOptional(bankInfo);
        if (bank_name || bank_bik || bank_post_account) {
            const name = bank_name || '-';
            const additionalInfo =
                bank_bik || bank_post_account
                    ? [bank_bik || '-', bank_post_account].filter(i => i).join(' / ')
                    : null;
            return [name, additionalInfo && `(${additionalInfo})`].filter(i => i).join(' ');
        }
    }
}
